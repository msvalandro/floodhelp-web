import Web3 from 'web3'

import ABI from './ABI.json'

const CONTRACT_ADDRESS = '0x188AbD89c86eb716F9c668d55728c92C779246c1'

export interface DonationRequest {
  id: number
  title: string
  description: string
  contact: string
  goal: number
  balance: number
  author: string
}

export async function login() {
  if (!window.ethereum) {
    throw new Error('Sem MetaMask instalado.')
  }

  const web3 = new Web3(window.ethereum)
  const accounts = await web3.eth.requestAccounts()

  if (!accounts || !accounts.length) {
    throw new Error('Carteira não permitida.')
  }
  console.log(accounts)
  localStorage.setItem('wallet', accounts[0].toLowerCase())

  return accounts[0].toLowerCase()
}

export async function getOpenRequests(lastId = 0) {
  if (!window.ethereum) {
    throw new Error('Sem MetaMask instalado.')
  }

  const from = localStorage.getItem('wallet')

  if (!from) {
    throw new Error('Carteira não é válida.')
  }

  const web3 = new Web3(window.ethereum)

  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from })
  console.log(contract)
  const requests: DonationRequest[] = await contract.methods
    .getOpenRequests(lastId + 1, 10)
    .call()

  return requests.filter((request) => request.title !== '')
}
