import {
  AccountWallet,
  CompleteAddress,
  ContractDeployer,
  createDebugLogger,
  Fr,
  PXE,
  waitForPXE,
  TxStatus,
  createPXEClient,
  getContractInstanceFromDeployParams,
  DebugLogger,
} from "@aztec/aztec.js";
import { getInitialTestAccountsWallets } from "@aztec/accounts/testing";
import { beforeAll, describe, expect, test } from "vitest";

const setupSandbox = async () => {
  const PXE_URL = "http://localhost:8080";
  const pxe = createPXEClient(PXE_URL);
  await waitForPXE(pxe);
  return pxe;
};

describe("aztec contract testing", async () => {
  let pxe: PXE;
  let wallets: AccountWallet[] = [];
  let accounts: CompleteAddress[] = [];
  let logger: DebugLogger;

  beforeAll(async () => {
    logger = createDebugLogger("aztec:aztec-starter");
    logger.info("Aztec-Starter tests running.");

    pxe = await setupSandbox();

    wallets = await getInitialTestAccountsWallets(pxe);
    accounts = wallets.map((w) => w.getCompleteAddress());
  });

  test("Deploys the contract", async () => {
    const salt = Fr.random();
    console.log(salt);
  });
});
