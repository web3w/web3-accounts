import {NullToken, Web3Accounts} from "../index";
import {getChainRpcUrl, NULL_ADDRESS, providers} from "web3-wallets";

const buyer = '0x9F7A946d935c8Efc7A8329C0d894A69bA241345A';
const seller = '0xeA199722372dea9DF458dbb56be7721af117a9Bc';
import * as secrets from '../../../secrets.json'

    ;

(async () => {
    try {
        const chainId = 4
        const sdk = new Web3Accounts({
            chainId,
            address: seller,
            privateKeys: secrets.privateKeys
        })


        const tokenBals = await sdk.getTokensBalance([
                {
                    token: NULL_ADDRESS,
                    decimals: 18
                },
                {
                    token: '0x44C73A7b3B286c78944aD79b2BBa0204916Cebca',
                    decimals: 18
                },
                {
                    token: "0xb506bfaa7661dabf4de80672bd3f13f4610a5fdf",
                    decimals: 18
                }
            ]
        )

        console.log(tokenBals)


        // const gasBal = await sdk.wethBalances()
        const depositTx = await sdk.wethWithdraw("1")

        const reciput = await depositTx.wait()

        const oo = {
            "account": "0x14d0a1877f2fe5761eb0f968384126091c40d53f",
            "rpcUrl": "https://element-api.eossql.com/api/v1/jsonrpc"
        }

        const network = {
            name: oo.account,
            chainId: 4
        }
        const foo = new providers.JsonRpcProvider(oo.rpcUrl, network)

        const userETHBal = await sdk.getUserTokenBalance(oo)
        console.log('ETH', userETHBal)

        const userERC20s = await sdk.getUserTokensBalance({
            tokens: [
                {
                    tokenAddr: '0x44C73A7b3B286c78944aD79b2BBa0204916Cebca',
                    decimals: 18
                },
                {
                    tokenAddr: "0xb506bfaa7661dabf4de80672bd3f13f4610a5fdf",
                    decimals: 18
                }
            ]
        })

        console.log('ERC20s', JSON.stringify(userERC20s, null, 2))


        const userETHs = await sdk.getUserTokensBalance({
            tokens: [],
            account: buyer
        })

        console.log('ETH', JSON.stringify(userETHs, null, 2))

        const userETHERC20Bals = await sdk.getUserTokensBalance({
            tokens: [
                {
                    tokenAddr: '0x44C73A7b3B286c78944aD79b2BBa0204916Cebca',
                    decimals: 18
                },
                {
                    tokenAddr: "0xb506bfaa7661dabf4de80672bd3f13f4610a5fdf",
                    decimals: 18
                }
            ],
            account: buyer
        })

        console.log('ETH+ERC20s', userETHERC20Bals)


        const ethBal = await sdk.getGasBalances()
        console.log(ethBal)

        const accountTokenBalD = await sdk.getUserTokenBalance({})
        console.log(accountTokenBalD)


        const userERC20Bal = await sdk.getUserTokenBalance({
            tokenAddr: '0x44C73A7b3B286c78944aD79b2BBa0204916Cebca',
            decimals: 18
        })
        console.log('ERC20', userERC20Bal)

        const userETHERC20Bal = await sdk.getUserTokenBalance({
            tokenAddr: '0x44C73A7b3B286c78944aD79b2BBa0204916Cebca',
            decimals: 18,
            account: buyer
        })
        console.log('ETH+ERC20', userETHERC20Bal)


        // return

        const rpcUrl = await getChainRpcUrl(chainId)

        const userETHBalRpc = await sdk.getUserTokenBalance({account: buyer, rpcUrl})
        console.log('ETH RPC', userETHBalRpc)

        const tokenBal = await sdk.getUserTokenBalance({
            tokenAddr: '0x44C73A7b3B286c78944aD79b2BBa0204916Cebca',
            decimals: 18,
            rpcUrl
        })
        console.log('ERC20 RPC', tokenBal)
        const accountTokenBal = await sdk.getUserTokenBalance({
            tokenAddr: '0x44C73A7b3B286c78944aD79b2BBa0204916Cebca',
            decimals: 18,
            account: seller,
            rpcUrl
        })
        console.log('ETH+ERC20 PRC', accountTokenBal)


    } catch (e) {
        console.log(e)
    }

})()
