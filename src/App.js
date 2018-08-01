import React, {Component} from 'react';
import {Message, Container, Icon, Card, Image, Statistic, Label, Button} from 'semantic-ui-react'
import web3 from './web3'
import lottery from './lottery'


class App extends Component {
    state = {
        manager: '',
        playercount: 0,
        balance: 0,
        showButton: 'none',
        loading: false
    }
    //as same as
    // constructor(props){
    //     super(props);
    //     this.state={manager:''}
    // }
    //退款
    handleBack = async () => {
        if (this.state.playercount < 1) {
            alert('暂未有彩民投注，无法退款')
            return
        }
        try {
            this.setState({loading: true});
            const accounts = await web3.eth.getAccounts();
            await lottery.methods.refund().send({
                from: accounts[0],
                value: '1000000000000000000'
            });
        } catch (e) {
            alert(e.toString())
        }
        this.setState({
            loading: false
        });
        window.location.reload(true)

    };
    //开奖
    handlePick = async () => {
        try {
            if (this.state.balance < 1) {
                alert('暂未有彩民投注，不可以开奖')
                return
            }
            console.log('test pick');
            this.setState({loading: true});
            const accounts = await web3.eth.getAccounts();

            await lottery.methods.pickWinnter().send({
                from: accounts[0]
            });
        } catch (e) {
            alert(e.toString())
        }
        this.setState({
            loading: false
        });
        window.location.reload(true)

    };
    //投注
    handleEnter = async () => {
        try {
            this.setState({
                loading: true
            })
            // console.log('test click');
            //获取帐户
            const accounts = await web3.eth.getAccounts();
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 1000000000000000000
            })
        } catch (e) {
            alert(e.toString())
        }
        this.setState({
            loading: false
        });
        window.location.reload(true)

    };

    async componentDidMount() {
        const mg = await lottery.methods.getManager().call();
        this.setState({
            manager: mg
        })
        const playercount = await lottery.methods.getPlayerCount().call();
        this.setState({
            playercount: playercount
        });
        const balance = await lottery.methods.getBalance().call();
        this.setState({
            balance: web3.utils.fromWei(balance, 'ether')
        })
        const accounts = await web3.eth.getAccounts();
        if (accounts[0] === mg) {
            this.setState({
                showButton: 'inline'
            })
        } else {
            this.setState({
                showButton: 'none'
            })
        }
    }


    render() {
        console.log(web3.version);
        return (
            <Container>
                <br/>

                <Card.Group>
                    <Card>
                        <Message info>
                            <Message.Header>诗和远方</Message.Header>
                            <p>梦想距离你很远？从这里开始</p>
                        </Message>
                    </Card>
                </Card.Group>
                <Card.Group>
                    <Card>
                        <Image src='./images/odl.jpg'/>
                        <Card.Content>
                            <Card.Header>超级大乐透 奖池{this.state.balance}</Card.Header>
                            <Card.Meta>
                                <p>管理员地址</p>
                                <Label>
                                    {this.state.manager}
                                </Label>
                            </Card.Meta>
                            <Card.Description>两元钱一个梦想，五百万一个回报</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user'/>
                                {this.state.playercount}
                                个彩民参与
                            </a>
                        </Card.Content>
                        <Card.Content extra>
                            <Statistic color='orange' size='tiny'>
                                <Statistic.Value>
                                    奖池： {this.state.balance} ETH
                                </Statistic.Value>
                            </Statistic>
                        </Card.Content>
                        <Button animated='fade' loading={this.state.loading} onClick={this.handleEnter}
                                disabled={this.state.loading}>
                            <Button.Content visible>放飞梦想</Button.Content>
                            <Button.Content hidden>投注产生希望</Button.Content>
                        </Button>
                        <Button color='yellow' style={{display: this.state.showButton}}
                                onClick={this.handlePick}>开奖</Button>
                        <Button color='red' style={{display: this.state.showButton}}
                                onClick={this.handleBack}>退款</Button>

                    </Card>
                </Card.Group>

            </Container>
        );
    }
}

export default App;
