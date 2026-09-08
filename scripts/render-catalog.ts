/**
 * Regenerate / validate every SKU × representative variant.
 * Usage: npx tsx scripts/render-catalog.ts
 */
import { SKUS } from "../src/catalog/skus.ts";
import { sublimationErrors } from "../src/spec/validate.ts";
import { publishVariant } from "../src/render/parity.ts";

async function main() {
  let failed = 0;
  for (const sku of SKUS) {
    const errors = sublimationErrors(sku);
    if (errors.length) {
      console.error(`FAIL ${sku.sku} sublimation`, errors);
      failed++;
      continue;
    }
    try {
      await publishVariant(sku);
      console.log(`OK   ${sku.sku}`);
    } catch (e) {
      console.error(`FAIL ${sku.sku} parity`, e);
      failed++;
    }
  }
  if (failed) {
    console.error(`\n${failed} SKU(s) failed`);
    process.exit(1);
  }
  console.log(`\n${SKUS.length} SKUs passed sublimation + parity`);
}

void main();
