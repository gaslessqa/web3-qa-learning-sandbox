import { ethers } from 'hardhat';

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('='.repeat(50));
  console.log('Deploying contracts with:', deployer.address);
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('Balance:', ethers.formatEther(balance), 'ETH');
  console.log('='.repeat(50));

  // Deploy Counter
  const Counter = await ethers.getContractFactory('Counter');
  const counter = await Counter.deploy();
  await counter.waitForDeployment();
  const counterAddress = await counter.getAddress();
  console.log('\nCounter deployed to:', counterAddress);

  // Deploy PracticeToken
  const PracticeToken = await ethers.getContractFactory('PracticeToken');
  const token = await PracticeToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log('PracticeToken deployed to:', tokenAddress);

  console.log('\n' + '='.repeat(50));
  console.log('Copy these addresses into the Web3 QA Lab:');
  console.log('  Counter:       ', counterAddress);
  console.log('  PracticeToken: ', tokenAddress);
  console.log('='.repeat(50));
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
