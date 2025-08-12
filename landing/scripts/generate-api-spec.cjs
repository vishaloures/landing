const path = require('path');
const fs = require('fs');
const protobuf = require('protobufjs');
const glob = require('glob');

// --- Configuration ---
// Base directory of the landing project where the script is located.
const LANDING_BASE_DIR = __dirname;
// Relative path from the script to the root of the monorepo (or parent folder).
const MONOREPO_ROOT_REL_PATH = path.resolve(LANDING_BASE_DIR, '..', '..', '..');
// Name of the directory containing the proto files.
const PROTO_DIR_NAME = 'finam-trade-api-main 3';
// Subpath to the root of all .proto files (which contains grpc/, google/, etc.).
const PROTO_ROOT_SUBPATH = 'proto';
// Glob pattern to find the primary service proto files, relative to PROTO_ROOT_SUBPATH.
const SERVICE_PROTO_GLOB = 'grpc/tradeapi/v1/**/*.proto';
// The namespace to extract definitions from.
const TARGET_NAMESPACE = 'tradeapi.v1';
// Output directory for the generated JSON spec.
const OUTPUT_DIR = path.resolve(LANDING_BASE_DIR, '..', 'src');
// Output filename.
const OUTPUT_FILE = 'api-spec.json';

// --- Main Generation Logic ---

/**
 * Finds and validates the path to the root of all proto files.
 * @returns {string} The absolute path to the proto root directory.
 * @throws {Error} If the directory cannot be found.
 */
function findProtoRoot() {
    const protoRootPath = path.join(MONOREPO_ROOT_REL_PATH, PROTO_DIR_NAME, PROTO_ROOT_SUBPATH);
    if (!fs.existsSync(protoRootPath)) {
        throw new Error(`[ERROR] Proto root directory not found at: ${protoRootPath}\nPlease check the project structure and configuration in this script.`);
    }
    console.log(`[INFO] Found proto root at: ${protoRootPath}`);
    return protoRootPath;
}

/**
 * Recursively traverses namespaces to build a complete API specification.
 * @param {protobuf.Namespace} namespace The current namespace to process.
 * @param {object} spec The specification object to populate.
 */
function buildSpecRecursively(namespace, spec) {
    if (!namespace) return;

    for (const nested of namespace.nestedArray) {
        if (nested instanceof protobuf.Service) {
            spec.services.push({
                name: nested.name,
                methods: nested.methodsArray.map(method => ({
                    name: method.name,
                    description: method.comment || '',
                    requestType: method.requestType,
                    responseType: method.responseType,
                })),
            });
        } else if (nested instanceof protobuf.Type) {
            spec.messages[nested.name] = {
                fields: nested.fieldsArray.map(field => ({
                    name: field.name,
                    type: field.type,
                    rule: field.rule,
                    id: field.id,
                    description: field.comment || '',
                })),
            };
        } else if (nested instanceof protobuf.Enum) {
            spec.enums[nested.name] = {
                values: nested.values,
                description: nested.comment || '',
            };
        } else if (nested instanceof protobuf.Namespace) {
            // It's a nested namespace, recurse into it
            buildSpecRecursively(nested, spec);
        }
    }
}


/**
 * Main function to run the generation process.
 */
async function main() {
    try {
        const protoRoot = findProtoRoot();
        const protoFiles = glob.sync(SERVICE_PROTO_GLOB, { cwd: protoRoot });

        if (protoFiles.length === 0) {
            throw new Error(`[ERROR] No service .proto files found in ${protoRoot} using glob "${SERVICE_PROTO_GLOB}"`);
        }

        console.log(`[INFO] Found ${protoFiles.length} service proto file(s):`, protoFiles.join(', '));

        const root = new protobuf.Root();
        root.resolvePath = (origin, target) => {
            // Use the protoRoot as the base for all lookups.
            const resolvedPath = path.join(protoRoot, target);
            if (fs.existsSync(resolvedPath)) {
                return resolvedPath;
            }
            // Fallback for descriptor.proto and other built-ins
            if (target.startsWith('google/protobuf/')) {
                 const pbjsLibPath = path.dirname(require.resolve('protobufjs'));
                 const builtInPath = path.join(pbjsLibPath, 'google', 'protobuf', path.basename(target));
                 if (fs.existsSync(builtInPath)) {
                    return builtInPath;
                 }
            }
            return null; // Let protobufjs handle the error for missing files.
        };
        
        await root.load(protoFiles, { keepCase: true });
        console.log('[INFO] Successfully loaded and parsed proto files and their dependencies.');

        const initialNamespace = root.lookup(TARGET_NAMESPACE);
        if (!initialNamespace) {
            throw new Error(`[ERROR] Could not find target namespace "${TARGET_NAMESPACE}" in the parsed proto files.`);
        }

        const apiSpec = {
            services: [],
            messages: {},
            enums: {},
        };
        
        buildSpecRecursively(initialNamespace, apiSpec);

        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        }

        const outputPath = path.join(OUTPUT_DIR, OUTPUT_FILE);
        fs.writeFileSync(outputPath, JSON.stringify(apiSpec, null, 2));

        console.log(`[SUCCESS] API specification generated successfully at: ${outputPath}`);

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

main();