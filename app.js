const bytecode = "0x608060405234801561001057600080fd5b5061020d806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806306661abd146100515780633fa4f2451461006f578063d1de1b841461008d578063f46fc20e14610097575b600080fd5b6100596100a1565b60405161006691906100f1565b60405180910390f35b6100776100a7565b60405161008491906100f1565b60405180910390f35b6100956100b0565b005b61009f6100c9565b005b60005481565b60008054905090565b6000808154809291906100c29061015f565b9190505550565b6000808154809291906100db90610116565b9190505550565b6100eb8161010c565b82525050565b600060208201905061010660008301846100e2565b92915050565b6000819050919050565b60006101218261010c565b91507f8000000000000000000000000000000000000000000000000000000000000000821415610154576101536101a8565b5b600182039050919050565b600061016a8261010c565b91507f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561019d5761019c6101a8565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220c49c1d862d054d2afceef8310919c6a0701ddf8b1aeb77394b820971f44ff46464736f6c63430008040033"
import counterContract from "./Counter.json" assert { type: "json" }

document.querySelector(".headButton").onclick = async function() {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        console.log("Account:", await signer.getAddress());

            // собираем контракт по кусочкам. 
        const Contract = new ethers.ContractFactory(
            counterContract.abi,
            bytecode,
            signer
            );
        const contract = await Contract.deploy(100);    // в скобочках указываем необходимое для конструктора
        await contract.deployed();
        console.log("Contract:", contract.address);     // аддресс можем прописать без await (он у нас на руках сразу) 
        await contract.deployTransaction.wait();

            // тут я просто меняю надпись на аддресс контракта.
        document.querySelector('.walletAddress').innerHTML = await contract.address;
    } else {
        alert('You must install MetaMask')
    }
}