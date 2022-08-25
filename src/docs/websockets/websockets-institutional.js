const websocketsInstitutional = [
    {
        category: 'Getting Started',
        items: [
            {
                id: 'connection',
                title: 'Connection Guide',
                content: `
                <p>
                    The websocket endpoint is available at <a href='wss://localhost:5000/v1/api/ws'>wss://localhost:5000/v1/api/ws</a>. Once connected, 
                    the session needs to be authorized. This can be achieved in two ways:
                </p>
                <h5>From a browser</h5>
                <p>
                    Include the cookies from the 'set-cookie' headers from previous API requests. If you are using a browser to
                    test API functionality, this will generally be done automatically by the browser.
                </p>
                <h5>From your client application</h5>
                <p>    
                Request the session ID from the <b>/tickle</b> endpoint and send it to the websocket endpoint in the following
                format:
                    <div v-highlight class='code-box'>
                        <pre class='language-json'><code>{'session': 'SESSION_ID_FROM_TICKLE_ENDPOINT'}</code></pre>
                    </div>
                </p>
                <h5>Sample response</h5>
                <p>
                    If the request is successful one of the following responses will be returned:
                    <div v-highlight class='code-box'>
                        <pre class='language-json'><code>{'topic': 'sts', 'args': {'authenticated': true}}</code></pre>
                    </div>
                    or:
                    <div v-highlight class='code-box'>
                        <pre class='language-json'><code>{'topic': 'system', 'success': 'username'}</code></pre>
                    </div>
                </p>
                `
            },
            {
                id: 'websocket-messages',
                title: 'Websocket Messages',
                content: `
                <p>
                    There are two types of messages used by the websocket:
                </p>
                <ul>
                    <li>
                        Solicited messages: messages that have been explicitly sent by the client
                    </li>
                    <li>
                        Unsolicited messages: messages that have been sent by the server, either as a response to a request or
                        containing information about the connected session
                    </li>
                </ul>
                <p>
                    In order to receive streaming data from the websocket, the relevant topic must be subscribed to. In order to do so,
                    a message of the format: <b>TOPIC+{ARGUMENTS}</b> must be sent to the websocket endpoint, where:
                </p>
                <ul>
                    <li>TOPIC represents the request that is being sent via the websocket</li>
                    <li>The plus symbol <b>+</b> is used as the message separator</li>
                    <li>{ARGUMENTS} contains a list of arguments passed as part of the request. An empty list {} needs to be passed
                    if no arguments are required</li>
                </ul>
                <p>
                    Solicited message topics are generally three characters in length and start with either an <b>s</b>, if the topic
                    is being subscribed to, or an <b>u</b> if unsubscribing from a topic.
                </p>
                `
            },
        ]
    },
    {
        category: 'Market Data',
        items: [
            {
                id: 'streaming-data',
                title: 'Streaming Market Data',
                content: `
                <p>
                    Streaming, top-of-the-book market data is available for all instruments using Client Portal API's websocket endpoint. For streaming data the following message needs to be sent to the endpoint:
                    <div v-highlight class='code-box'>
                        <pre class='language-json'><code>smd+conId+{arguments}</code></pre>
                    </div>
                </p>
                <p>
                The conId is the instrument's unique contract identifier within Interactive Brokers' database. 
                </p>
                <p>
                    Contracts requested via this topic use SMART routing by default. If you wish to specify the exchange explicitly, 
                    the passed contract identifier should be modified into the format <b>conId@EXCHANGE</b>, where EXCHANGE is the exchange on which the contract trades.
                </p>
                <p>
                    <b>Tip:</b> The contract ID for a particular instrument can be found using the endpoint <b>/iserver/secdef/search</b>.
                </p>
                <p>
                    In order to unsubscribe from market data for the specified contract ID, the following message needs to be sent to the endpoint:
                    <div v-highlight class='code-box'>
                        <pre class='language-json'><code>umd+conId+{}</code></pre>
                    </div>
                </p>
                <h5>Example: Requesting streaming close price and daily percent change for APPL stock</h5>
                <p>
                    In order to request streaming market data, a subscription request must first be sent for the specific contract. In this case, we know that the APPL@NASDAQ contract
                    has a contract ID of 265598. In addition, we must also specify the fields that should be returned. In this case we are interested in fields 31 - close price, and 83 - the % change, or difference between the last price and the close price for the previous day.
                    For a list of available tags, please see the <a href='/endpoints'>endpoint explorer</a>.  
                </p>
                <div v-highlight class='code-box'>
                <pre class='language-json'><code>smd+265598+{'fields':['31','83']}</code></pre>
                </div>
                `
            },
            {
                id: 'historical-data',
                title: 'Historical Data',
                content: `
                <p>
                    For streaming historical data, the topic <b>smh+Id</b> is used. There are also optional parameters available in JSON format. 
                    If no parameters are specified, the empty parameters array <b>{}</b> can be passed. 
                    Incorrectly specified parameters are ignored and the default (empty) response is returned. 
                    To unsubscribe, the topic is <b>umh+serverId</b> can be used, where <b>serverID</b> is the server ID associated with the request.
                </p>
                <p>
                    <b>NOTE:</b> Only a max of 5 concurrent historical data request available at a time.
                </p>
                <p>
                    The historical market data request takes the following parameters:
                </p>
                <table>
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Description</th>
                        <th>Valid Values</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>exchange: String</td>
                        <td>Contract exchange</td>
                        <td>Valid exchange on which the contract trades</td>
                    </tr>
                    <tr>
                        <td>period: String</td>
                        <td>Request duration</td>
                        <td>
                            <ul>
                                <li>{1-30}min</li>
                                <li>{1-8}h</li>
                                <li>{1-1000}d</li>
                                <li>{1-792}w</li>
                                <li>{1-182}m</li>
                                <li>{1-15}y</li>
                        </td>
                    </tr>
                    <tr>
                        <td>bar: String</td>
                        <td>Request bar size</td>
                        <td>
                            <ul>
                                <li>1min</li>
                                <li>2min</li>
                                <li>3min</li>
                                <li>5min</li>
                                <li>10min</li>
                                <li>15min</li>
                                <li>30min</li>
                                <li>1h</li>
                                <li>2h</li>
                                <li>3h</li>
                                <li>4h</li>
                                <li>8h</li>
                                <li>1d</li>
                                <li>1w</li>
                                <li>1m</li>
                        </td>
                    </tr>
                    <tr>
                        <td>outsideRTH: Boolean</td>
                        <td>Request data outside trading hours</td>
                        <td>
                            true/false
                        </td>
                    </tr>
                    <tr>
                        <td>source: String</td>
                        <td>Type of date requested</td>
                        <td>
                            <ul>
                                <li>midpoint</li>
                                <li>trades</li>
                                <li>bid_ask</li>
                                <li>bid</li>
                                <li>ask</li>
                        </td>
                    </tr>
                    <tr>
                        <td>format: String</td>
                        <td>Historical values returned</td>
                        <td>
                            <ul>
                                <li>%o - open</li>
                                <li>%c - close</li>
                                <li>%h - high</li>
                                <li>%l - low</li>
                        </td>
                    </tr>
                </tbody>
            </table>
            <h5>Example: Requesting mutltiple historical values in a single request</h5>
            <p>
                Multiple historical values can be requested using a single request by separating the fields to be returned with a forward slash, for example:
            </p>
            <div v-highlight class='code-box'>
                <pre class='language-json'><code>smh+265598+{
    'period': '1d',
    'bar': '1min', 
    'source': 'trades', 
    'format': '%o/%c/%h/%l'
}</code>
</pre>
            </div>
            <p>
                returns the open, close, high, and low trades prices for the last day with one minute bars.
            </p>
            <h5>Example: Request AAPL historical trade high data for past 2 hours with 5 mins bars</h5>
            <div v-highlight class='code-box'>
    <pre class='language-json'><code>smh+265598+{
    'exchange':'ISLAND',
    'period':'2h',
    'bar':'5min',
    'outsideRth':false,
    'source':'trades',
    'format':'%h/%l'
}</code></pre>
            </div>
            <p>
                The following response will be returned:
            </p>
            <div v-highlight class='code-box'>
    <pre class='language-json'><code>{
    'serverId': '341115',
    'symbol': 'AAPL',
    'text': 'AAPLE INC',
    'priceFactor': 100,
    'startTime': '20210317-18:00:00',
    'high': '12586/14469/65',
    'low': '12283/34103/0',
    'timePeriod': '7200s',
    'barLength': 300,
    'mdAvailability': 'S',
    'mktDataDelay': 0,
    'outsideRth': false,
    'volumeFactor': 1,
    'priceDisplayRule': 1,
    'priceDisplayValue': '2',
    'negativeCapable': false,
    'messageVersion': 2,
    'data': [...],
    'points': 23, 
    'topic': 'smh+265598',
}</code></pre>
            </div>
            <p>
                Note the server ID associated with the subscription. In order to unsubscribe from the topic, we send the unsubscription message with the server ID:
            </p>
            <div v-highlight class='code-box'>
                <pre class='language-json'><code>umh+{serverId}</code></pre>
            </div>
                `,
            }
        ]
    },
    {
        category: 'Order & Positions Operations',
        items: [
            {
                id: 'live-orders',
                title: 'Live Order Updates',
                content: `
                <p>
                    As long as an order is active, it is possible to retrieve it using Client Portal API. Live streaming orders can be requested by subscribing to the <b>sor</b> topic. 
                    Once live orders are requested we will start to relay back when there is an update. 
                    To receive all orders for the current day the endpoint <b>/iserver/account/orders</b> can be used. 
                    It is advised to query all orders for the current day first before subscribing to live orders. 
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>sor+{}</code></pre>
                </div>
                <p>
                    Which returns the following sample response:
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>{
    'topic': 'sor' ,
    'args': [
        {
            'acct': 'DU1234',
            'conid': 265598,
            'orderId': 922048212,
            'cashCcy': 'USD',
            'sizeAndFills': '0/1',
            'orderDesc': 'Buy 100 Limit 372.00 GTC',
            'description1': 'AAPL',
            'ticker': 'AAPL',
            'secType': 'STK',
            'listingExchange': 'NASDAQ.NMS',
            'remainingQuantity': 100.0,
            'filledQuantity': 0.0,
            'companyName': 'APPLE INC',
            'status': 'Submitted',
            'origOrderType': 'LIMIT',
            'supportsTaxOpt': '1',
            'lastExecutionTime': '200708173551',
            'lastExecutionTime_r': 1594229751000,
            'orderType': 'Limit',
            'side': 'BUY',
            'timeInForce': 'GTC',
            'price': 372,
            'bgColor': '#000000',
            'fgColor': '#00F000'
        }
    ]
}</code></pre>
                </div>
                <p>
                    To unsubscribe from streaming order updates, the topic <b>uor</b> needs to be sent to the websocket endpoint.
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>uor+{}</code></pre>
                </div>
                <p>
                    When there is an update to your order only the change to the order is relayed back along with the orderId. Most commonly this would involve status changes and partial fills. 
                    <br>
                    An example of a status change is:
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'> <code>{
    'topic': 'sor' ,
    'args': [
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'status': 'PendingSubmit',
            'fgColor': '#3399CC'
        },
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'status': 'PreSubmitted',
            'bgColor': '#FFFFFF',
            'fgColor': '#0000CC'
        },
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'status': 'Submitted',
            'bgColor': '#000000',
            'fgColor': '#00F000'
        }
    ]
}</code></pre>
                </div>
                <p>
                    And an example of a partial fill is:
                </p>
                <div v-highlight class='code-box'>
<pre class='language-json'><code>{
    'topic': 'sor' ,
    'args': [
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'sizeAndFills': '100/622',
            'remainingQuantity': 622.0,
            'filledQuantity': 100.0,
            'avgPrice': '382.45',
        },
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'sizeAndFills': '700/22',
            'remainingQuantity': 22.0,
            'filledQuantity': 700.0,
        },
        {
            'acct': 'DU1234',
            'orderId': 352055828,
            'sizeAndFills': '722',
            'orderDesc': 'Sold 722 Limit 382.40 GTC',
            'remainingQuantity': 0.0,
            'filledQuantity': 722.0,
            'status': 'Filled',
            'timeInForce': 'GTC',
            'price': 382.4,
            'bgColor': '#FFFFFF',
            'fgColor': '#000000'
        }
    ]
}</code></pre>
                </div>
                `
            },
            {
                id: 'trades',
                title: 'Trades Details',
                content: `
                <p>
                    To review a list of your trades for the current and previous six days, the topic <b>str</b> can be sent to the websocket endpoint.
                    In addition to the trades history, this topic will also return trade updates as they become available.
                    </p>
                    <div v-highlight class='code-box'>
                    <pre class='language-json'><code>str+{}</code></pre>
                </div>
                <p>
                    Which returns the following, sample, response:
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>{
    'topic': 'str' ,
    'args': [
        {
            'execution_id': '0000e0d5.60cf1bd1.01.01',
            'symbol': 'AAPL',
            'supports_tax_opt': '1',
            'side': 'B',
            'order_description': 'Bot 1 @ 130.64 on ISLAND',
            'trade_time': '20210408-22:10:01',
            'trade_time_r': 1617919801000,
            'size': 1,
            'price': '130.64',
            'order_ref': '66807500',
            'submitter': 'apara428',
            'exchange': 'ISLAND',
            'commission': '0.35',
            'net_amount': 130.64,
            'account': 'DU26214',
            'accountCode': 'DU26214',
            'company_name': 'APPLE INC',
            'contract_description_1': 'AAPL',
            'sec_type': 'STK',
            'listing_exchange': 'NASDAQ.NMS',
            'conid': '265598',
            'conidex': '265598',
            'clearing_id': 'IB',
            'clearing_name': 'IB',
            'liquidation_trade': '0'
        }
    ]
}</code></pre>
                </div>
                <p>
                    To unsubscribe from trades, the topic <b>utr</b> needs to be sent.                
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>utr+{}</code></pre>
                </div>
                <h5>Example: Request real-time trade updates only</h5>
                <p>
                    To receive new trade updates only and no previous trades details, the 'realtimeUpdatesOnly' parameter can be passed as part of the <b>str</b> message as follows: 
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>str+{'realtimeUpdatesOnly': true}</code></pre>
                </div>
                <h5>Example: Request trade history for a specified number of days</h5>
                <p>
                    If trades are required for less than 7 days the 'days' parameter can be passed with integer value corresponding to the number of days needed (1 represents today and value can be up to 7). 
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>str+{'days': 1}</code></pre>
                </div>
                `,
            },
            {
                id: 'profit-and-loss',
                title: 'Profit & Loss Updates',
                content: `
                <p>
                    For existing positions it is possible to receive Profit & Loss updates via Client Portal API using the topic <b>spl</b>. 
                    As part of the response the daily profit and loss (abbreviated as dpl) and unrealized profit and loss (upl) are received as a total value for all positions. 
                    Position profit and loss updates are relayed back to the client as quickly as possible, usually once per second during market hours, but can vary based on market activity.                
                </p>
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>spl+{}</code></pre>
                </div>
                <p>
                    Which returns the following, sample, response. You can see the account number, the daily profit and loss and the unrealized profit and loss.
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>{
    'topic': 'spl' ,
    'args': {
        'DU1234.Core': {
        'rowType':1,
        'dpl':-57520.0,
        'upl':972100.0
        }
    }
}</code></pre>
                </div>
                <p>
                    In order to unsubscribe from further updates, the topic <b>upl</b> is sent.
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>upl+{}</code></pre>
                </div>
                `,
            },

        ]
    },
    {
        category: 'Miscellaneous Operations',
        items: [
            {
                id: 'echo',
                title: 'Echo',
                content: `
                <p>
                    To maintain an active websocket connection the topic <b>ech</b> is used to send a hearbeat with the argument hb. It is advised to send a heatbeat at least once per minute.
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>ech+hb</code></pre>
                </div>
                `
            },
            {
                id: 'ping-session',
                title: 'Ping Session',
                content: `
                <p>
                    To maintain a session for accessing <b>/iserver</b> or <b>/ccp</b> endpoints use the topic <b>tic</b>. It is advised to ping the session at least once per minute.
                </p>
                <p>
                    <b>Note:</b> It is still required to send a request to the <b>/tickle</b> endpoint every few minutes or when the session expires (<b>/sso/validate</b> is returning a 0). 
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>tic</code></pre>
                </div>
                `
            },
        ]
    },
    {
        category: 'Unsolicted Messages',
        items: [
            {
                id: 'system-connection-message',
                title: 'System Connection',
                content: `
                <p>
                When initially connecting to websocket the topic system relays back a confirmation with the corresponding username. While the websocket is connecting every 10 seconds there after a heartbeat with corresponding unix time (in millisecond format) is relayed back. An example response is:
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>{
    'topic': 'system' ,
    'success': 'user123'
}</code></pre>
                </div>
                `
            },
            {
                id: 'authentication-status',
                title: 'Authentication Status',
                content: `
                <p>
                    When initially connecting to the websocket endpoint, the topic <b>sts</b> will relay back the current authentication status of the user. 
                    Authentication status updates, for example those resulting from competing sessions, are also relayed back to the websocket client via this topic.
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>{
    'topic': 'sts' ,
    'args': {
        'authenticated': true
    }
}</code></pre>
                </div>
                `
            },
            {
                id: 'notifications',
                title: 'Notifications',
                content: `
                <p>
                    If there is a brief message regarding trading activity the topic ntf will be sent.
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>{
    'topic': 'ntf' ,
    'args': {
        'id': INDICATIVE_DATA_SUGGESTION ,
        'text': 'CFD quotes reference the trade, volume and bid/ask market data on the underlying STK' ,
        'title': 'Warning' ,
        'url': 'https://interactivebrokers.com/'
    }
}</code></pre>
                </div>
                `
            },
            {
                id: 'bulletins',
                title: 'Bulletins',
                content: `
                <p>
                    If there are urgent messages concerning exchange issues, system problems and other trading information the topic <b>blt</b> is sent along with the message argument.
                </p>
                <div v-highlight class='code-box'>
                    <pre class='language-json'><code>{
    'topic': 'blt' ,
    'args': [
        'id': '' ,
        'message': '' 
    ]
}</code></pre>
                </div>
                `
            },
        ]
    },
]

export default websocketsInstitutional;