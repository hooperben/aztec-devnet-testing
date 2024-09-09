import {
  ActualAztecContractContractArtifact,
  ActualAztecContractContract,
} from "../src/artifacts/ActualAztecContract.js";
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

    const actualContract = ActualAztecContractContractArtifact;
    const [deployerWallet, adminWallet] = wallets; // using first account as deployer and second as contract admin
    const adminAddress = adminWallet.getCompleteAddress().address;

    const deploymentData = getContractInstanceFromDeployParams(actualContract, {
      constructorArgs: [adminAddress],
      salt,
      deployer: deployerWallet.getAddress(),
    });

    const deployer = new ContractDeployer(actualContract, deployerWallet);
    const tx = deployer
      .deploy(adminAddress)
      .send({ contractAddressSalt: salt });
    const receipt = await tx.getReceipt();

    expect(receipt).toEqual(
      expect.objectContaining({
        status: TxStatus.PENDING,
        error: "",
      }),
    );

    const receiptAfterMined = await tx.wait({ wallet: deployerWallet });

    expect(await pxe.getContractInstance(deploymentData.address)).toBeDefined();
    expect(
      await pxe.isContractPubliclyDeployed(deploymentData.address),
    ).toBeTruthy();
    expect(receiptAfterMined).toEqual(
      expect.objectContaining({
        status: TxStatus.SUCCESS,
      }),
    );

    expect(receiptAfterMined.contract.instance.address).toEqual(
      deploymentData.address,
    );
  }, 300_000);
});
