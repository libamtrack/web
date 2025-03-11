#!/bin/bash

# Define key paths
WORKDIR="/workspaces/web/library/distributions/JavaScript"
OUTPUT_DIR="$WORKDIR/output"
DEST_DIR1="/workspaces/web/src"
DEST_DIR2="$DEST_DIR1/static/js"

# Define GSL paths
GSL_INCLUDE_DIRS="$HOME/usr/include"
GSL_LIBRARY="$HOME/usr/lib/libgsl.a"
GSL_CBLAS_LIBRARY="$HOME/usr/lib/libgslcblas.a"

# Print status
echo "Changing directory to: $WORKDIR"

# Navigate to working directory and compile
echo "Compiling JavaScript distribution..."
cd "$WORKDIR" && GSL_INCLUDE_DIRS=$GSL_INCLUDE_DIRS GSL_LIBRARY=$GSL_LIBRARY GSL_CBLAS_LIBRARY=$GSL_CBLAS_LIBRARY ./compile_to_js.sh

echo "Compilation complete. Copying output files..."

# Copy compiled files to destination directories
echo "Copying libat.js to $DEST_DIR1"
cp "$OUTPUT_DIR/libat.js" "$DEST_DIR1"
echo "Copying libat.js to $DEST_DIR2"
cp "$OUTPUT_DIR/libat.js" "$DEST_DIR2"
echo "Copying libat.wasm to $DEST_DIR1"
cp "$OUTPUT_DIR/libat.wasm" "$DEST_DIR1"
echo "Copying libat.wasm to $DEST_DIR2"
cp "$OUTPUT_DIR/libat.wasm" "$DEST_DIR2"

echo "All files copied successfully."
