/**
 * 利用ethers部署合约
 * 1、const contractFactory = new ethers.ContractFactory(abi, bytecode, signer);
 * 2、const contract = await contractFactory.deploy(args);
 * 
 * "Contract Creation Code"（合约创建代码）：合约源码的字节码
 * "Deployed Bytecode"（部署字节码）：合约编译后用于部署的字节码
 */

const ethers = require('ethers');
//链接节点服务商
const ALCHEMY_SEPOLIA_KEY = '2vsw2JgOi6Hq-6Ky9RvvKnL4f88kg5qZ';
const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_SEPOLIA_KEY}`);

//生成钱包signer
const privateKey = '5f5e109d57e793f4886f4b406b0e013e92c76b0273d3278e8a956af7d877dff0';
const wallet = new ethers.Wallet(privateKey, provider);

//在Remix中生成abi和bytecode
const abiERC20 = [{"inputs": [{"internalType": "string","name": "name_","type": "string"},{"internalType": "string","name": "symbol_","type": "string"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "owner","type": "address"},{"indexed": true,"internalType": "address","name": "spender","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Approval","type": "event"},{"anonymous": false,"inputs": [{"indexed": true,"internalType": "address","name": "from","type": "address"},{"indexed": true,"internalType": "address","name": "to","type": "address"},{"indexed": false,"internalType": "uint256","name": "value","type": "uint256"}],"name": "Transfer","type": "event"},{"inputs": [{"internalType": "address","name": "","type": "address"},{"internalType": "address","name": "","type": "address"}],"name": "allowance","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "spender","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "approve","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "balanceOf","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "burn","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "decimals","outputs": [{"internalType": "uint8","name": "","type": "uint8"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "mint","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "symbol","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "totalSupply","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "recipient","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transfer","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "sender","type": "address"},{"internalType": "address","name": "recipient","type": "address"},{"internalType": "uint256","name": "amount","type": "uint256"}],"name": "transferFrom","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "nonpayable","type": "function"}];
//或者手写abi
const abiERC20_1 = [
    "constructor(string memory name_, string memory symbol_)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint256 amount) external returns (bool)",
    "function mint(uint amount) external",
];

const bytecodeERC20 = '60806040526040518060400160405280601381526020017f536f6c6964697479206279204578616d706c6500000000000000000000000000815250600390816200004a91906200036f565b506040518060400160405280600781526020017f534f4c4259455800000000000000000000000000000000000000000000000000815250600490816200009191906200036f565b50601260055f6101000a81548160ff021916908360ff160217905550348015620000b9575f80fd5b5060405162001349380380620013498339818101604052810190620000df9190620005ab565b8160039081620000f091906200036f565b5080600490816200010291906200036f565b5050506200062e565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806200018757607f821691505b6020821081036200019d576200019c62000142565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f60088302620002017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620001c4565b6200020d8683620001c4565b95508019841693508086168417925050509392505050565b5f819050919050565b5f819050919050565b5f62000257620002516200024b8462000225565b6200022e565b62000225565b9050919050565b5f819050919050565b620002728362000237565b6200028a62000281826200025e565b848454620001d0565b825550505050565b5f90565b620002a062000292565b620002ad81848462000267565b505050565b5b81811015620002d457620002c85f8262000296565b600181019050620002b3565b5050565b601f8211156200032357620002ed81620001a3565b620002f884620001b5565b8101602085101562000308578190505b620003206200031785620001b5565b830182620002b2565b50505b505050565b5f82821c905092915050565b5f620003455f198460080262000328565b1980831691505092915050565b5f6200035f838362000334565b9150826002028217905092915050565b6200037a826200010b565b67ffffffffffffffff81111562000396576200039562000115565b5b620003a282546200016f565b620003af828285620002d8565b5f60209050601f831160018114620003e5575f8415620003d0578287015190505b620003dc858262000352565b8655506200044b565b601f198416620003f586620001a3565b5f5b828110156200041e57848901518255600182019150602085019450602081019050620003f7565b868310156200043e57848901516200043a601f89168262000334565b8355505b6001600288020188555050505b505050505050565b5f604051905090565b5f80fd5b5f80fd5b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b62000487826200046c565b810181811067ffffffffffffffff82111715620004a957620004a862000115565b5b80604052505050565b5f620004bd62000453565b9050620004cb82826200047c565b919050565b5f67ffffffffffffffff821115620004ed57620004ec62000115565b5b620004f8826200046c565b9050602081019050919050565b5f5b838110156200052457808201518184015260208101905062000507565b5f8484015250505050565b5f620005456200053f84620004d0565b620004b2565b90508281526020810184848401111562000564576200056362000468565b5b6200057184828562000505565b509392505050565b5f82601f83011262000590576200058f62000464565b5b8151620005a28482602086016200052f565b91505092915050565b5f8060408385031215620005c457620005c36200045c565b5b5f83015167ffffffffffffffff811115620005e457620005e362000460565b5b620005f28582860162000579565b925050602083015167ffffffffffffffff81111562000616576200061562000460565b5b620006248582860162000579565b9150509250929050565b610d0d806200063c5f395ff3fe608060405234801561000f575f80fd5b50600436106100a7575f3560e01c806342966c681161006f57806342966c681461016557806370a082311461018157806395d89b41146101b1578063a0712d68146101cf578063a9059cbb146101eb578063dd62ed3e1461021b576100a7565b806306fdde03146100ab578063095ea7b3146100c957806318160ddd146100f957806323b872dd14610117578063313ce56714610147575b5f80fd5b6100b361024b565b6040516100c09190610985565b60405180910390f35b6100e360048036038101906100de9190610a36565b6102d7565b6040516100f09190610a8e565b60405180910390f35b6101016103c4565b60405161010e9190610ab6565b60405180910390f35b610131600480360381019061012c9190610acf565b6103c9565b60405161013e9190610a8e565b60405180910390f35b61014f61056e565b60405161015c9190610b3a565b60405180910390f35b61017f600480360381019061017a9190610b53565b610580565b005b61019b60048036038101906101969190610b7e565b610652565b6040516101a89190610ab6565b60405180910390f35b6101b9610667565b6040516101c69190610985565b60405180910390f35b6101e960048036038101906101e49190610b53565b6106f3565b005b61020560048036038101906102009190610a36565b6107c5565b6040516102129190610a8e565b60405180910390f35b61023560048036038101906102309190610ba9565b6108db565b6040516102429190610ab6565b60405180910390f35b6003805461025890610c14565b80601f016020809104026020016040519081016040528092919081815260200182805461028490610c14565b80156102cf5780601f106102a6576101008083540402835291602001916102cf565b820191905f5260205f20905b8154815290600101906020018083116102b257829003601f168201915b505050505081565b5f8160025f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040516103b29190610ab6565b60405180910390a36001905092915050565b5f5481565b5f8160025f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546104519190610c71565b925050819055508160015f8673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546104a49190610c71565b925050819055508160015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546104f79190610ca4565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161055b9190610ab6565b60405180910390a3600190509392505050565b60055f9054906101000a900460ff1681565b8060015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546105cc9190610c71565b92505081905550805f808282546105e39190610c71565b925050819055505f73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516106479190610ab6565b60405180910390a350565b6001602052805f5260405f205f915090505481565b6004805461067490610c14565b80601f01602080910402602001604051908101604052809291908181526020018280546106a090610c14565b80156106eb5780601f106106c2576101008083540402835291602001916106eb565b820191905f5260205f20905b8154815290600101906020018083116106ce57829003601f168201915b505050505081565b8060015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f82825461073f9190610ca4565b92505081905550805f808282546107569190610ca4565b925050819055503373ffffffffffffffffffffffffffffffffffffffff165f73ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516107ba9190610ab6565b60405180910390a350565b5f8160015f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546108129190610c71565b925050819055508160015f8573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205f8282546108659190610ca4565b925050819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516108c99190610ab6565b60405180910390a36001905092915050565b6002602052815f5260405f20602052805f5260405f205f91509150505481565b5f81519050919050565b5f82825260208201905092915050565b5f5b83811015610932578082015181840152602081019050610917565b5f8484015250505050565b5f601f19601f8301169050919050565b5f610957826108fb565b6109618185610905565b9350610971818560208601610915565b61097a8161093d565b840191505092915050565b5f6020820190508181035f83015261099d818461094d565b905092915050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6109d2826109a9565b9050919050565b6109e2816109c8565b81146109ec575f80fd5b50565b5f813590506109fd816109d9565b92915050565b5f819050919050565b610a1581610a03565b8114610a1f575f80fd5b50565b5f81359050610a3081610a0c565b92915050565b5f8060408385031215610a4c57610a4b6109a5565b5b5f610a59858286016109ef565b9250506020610a6a85828601610a22565b9150509250929050565b5f8115159050919050565b610a8881610a74565b82525050565b5f602082019050610aa15f830184610a7f565b92915050565b610ab081610a03565b82525050565b5f602082019050610ac95f830184610aa7565b92915050565b5f805f60608486031215610ae657610ae56109a5565b5b5f610af3868287016109ef565b9350506020610b04868287016109ef565b9250506040610b1586828701610a22565b9150509250925092565b5f60ff82169050919050565b610b3481610b1f565b82525050565b5f602082019050610b4d5f830184610b2b565b92915050565b5f60208284031215610b6857610b676109a5565b5b5f610b7584828501610a22565b91505092915050565b5f60208284031215610b9357610b926109a5565b5b5f610ba0848285016109ef565b91505092915050565b5f8060408385031215610bbf57610bbe6109a5565b5b5f610bcc858286016109ef565b9250506020610bdd858286016109ef565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f6002820490506001821680610c2b57607f821691505b602082108103610c3e57610c3d610be7565b5b50919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610c7b82610a03565b9150610c8683610a03565b9250828203905081811115610c9e57610c9d610c44565b5b92915050565b5f610cae82610a03565b9150610cb983610a03565b9250828201905080821115610cd157610cd0610c44565b5b9291505056fea26469706673582212201d54d40d8fc043ce91b547358570c12a4e4a90f91e69079262b0e4a5fad22f2164736f6c63430008150033';

//部署合约
const factoryERC20 = new ethers.ContractFactory(abiERC20, bytecodeERC20, wallet);

const main = async () => {
    //填入构造函数参数
    const contractERC20 = await factoryERC20.deploy("SYJ-TOKEN0820", 'SYJ0820');
    console.log(`1.部署合约`);
    console.log(`合约地址${contractERC20.target}`);
    console.log(`部署合约的交易详情`);
    console.log(contractERC20.deploymentTransaction());
    console.log(`等待合约部署上链`);
    await contractERC20.waitForDeployment();
    console.log(`合约已上链`);
    console.log(`合约地址: ${await contractERC20.getAddress()}`);

    console.log(`\n2.调用构造函数`);
    console.log(`调用mint()函数, 给自己地址mint 1000代币`);
    console.log(`合约名称：${await contractERC20.name()}`);
    console.log(`合约代号：${await contractERC20.symbol()}`);
    let tx = await contractERC20.mint("10000");
    console.log(`等待交易上链`);
    await tx.wait();
    console.log(`mint后地址余额: ${await contractERC20.balanceOf(wallet)}`);
    console.log(`代币总供给: ${await contractERC20.totalSupply()}`);

    //调用transfer函数，给V神转账
    console.log(`\n3.进行transfer交易`);
    addressVitalik = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    const tx2 = await contractERC20.transfer(addressVitalik, 1000);
    console.log(`等待交易上链`);
    await tx2.wait();
    //如何获取交易hash
    console.log(tx2);
    console.log(`V神地址余额: ${await contractERC20.balanceOf(addressVitalik)}`);
    console.log(`当前地址余额: ${await contractERC20.balanceOf(wallet)}`);
}
main()
