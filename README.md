# 🛟 FloodHelp Web

## 📝 Description

FloodHelp Web is a project created while studying web3 development during the Web3 Week program by [LuizTools](https://www.luiztools.com.br/). The project consists of a smart contract written in Solidity using the Remix IDE and a frontend dApp built with Next.js, Tailwind CSS, React Hook Form, and Zod.

The goal of this platform is to enable people to make donations for natural disasters using blockchain/crypto instead of regular payment methods. This approach helps avoid administrative fees from traditional payment platforms, allowing more funds to reach those in need. Users can create donation requests, view a list of existing donations on the home screen, and donate to various campaigns.

## ✨ Features

- **Create Donation Requests:** Users can create requests for donations to support natural disaster relief efforts.
- **View Donations:** A list of all donation requests is available on the home screen.
- **Make Donations:** Users can donate to existing campaigns using blockchain/crypto.

## ☕️ Prerequisites

- Node.js v18.17.1 or higher
- pnpm (package manager)
  
## 🛠️ Installation

To set up the project locally, follow these steps:

1. **Deploy the Smart Contract:**
   - Use [Remix IDE](https://remix.ethereum.org/) to deploy the smart contract. The code for the smart contract can be found in the `FloodHelp.sol` file.

2. **Environment Variables:**
   - Create a `.env.local` file in the root directory of your project. Use the `.env.example` file as a reference.
   - Add the deployment key from the blockchain to the environment variables.

3. **Install Dependencies:**
   ```sh
   pnpm i
   ```

4. **Start the Application:**
    ```sh
    pnpm dev
    ```
    - The application will be available at http://localhost:3000.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.