const workflowsIndividual = [
    {
        category: 'Connectivity',
        items: [
            {
                id: 'competing-session',
                title: 'Competing Session',
                content: `
                <p>
                    Only a single active brokerage session can exist for any username accross all IBKR services. 
                    If you are logged in to either Client Portal, TWS, or IBKR Mobile, make sure to log out and try reauthenticating your session Client Portal API again. 
                    The endpoint <b>/reauthenticate</b> can be used to reauthenticate the brokerage session. 
                </p>
                <p>
                    <b>Tip:</b> The query parameter <b>force=true</b> can be passed to the <b>/reauthenticate</b> endpoint to disconnect other competing sessions before reauthenticating.
                </p>
                `
            },
            {
                id: 'session-duration',
                title: 'Session Duration',
                content: `
                <p>
                    The maximum amount of time that the Client Portal API session can remain authenticated is 24 hours. 
                    After this time, clients will need to reauthenticate their session by following the instructions on the <a href='./quickstart'>Quickstart</a> page.
                    In addition, the session will time out if no requests are received within a span of 5 minutes. 
                    In order to prevent this from happening, you can use the <b>/sso/validate</b> endpoint can be called on a regular basis. It is recommended to call this endpoint approximately every minute.
                </p>
                `
            },
            {
                id: 'mutliple-usernames',
                title: 'Multiple Usernames',
                content: `
                <p>
                    Clients wishing to use multiple IBKR products at the same time (TWS, IBKR Mobile or Client Portal) can do so by creating a new username 
                    that can then be used to log into other services while using the Client Portal API. 
                    To create a second username please see the following <a href="https://ibkr.info/node/1004" target="_blank">article</a>. 
                </p>
                <p>
                    <b>Note:</b> In accordance with market data vendor requirements, market data services are user-specific and any username subscribed will be assessed a separate market data subscription fee.
                </p>
                `
            },
            {
                id: 'network-error-cors',
                title: 'Network Error while accessing endpoints',
                content: `
                <p>
                    In order to use the endpoints and websockets functionality on the documentation page inside a web browser, Cross Origin Resource Blocking (CORB) 
                    needs to be disabled from within the browser.
                    Several extensions for both Chrome and Firefox are available to toggle CORB on and off from within the browser.
                </p>
                <p>
                    <b>Tip:</b> CORB is disabled by default when using API testing tools such as Postman or Thunder Client.
                </p>
                `
            },
            {
                id: 'gateway-less-auth',
                title: 'Authenticating without a Gateway',
                content: `
                <p>
                    It is currently not possible for individual clients to authenticate a Client Portal API session without a gateway.
                </p>
                `
            },
            {
                id: 'security-device-opt-out',
                title: 'Opting out of 2FA',
                content: `
                <p>
                    Since the login process to the Client Portal API is the same as that for Client Portal, which has access to sensitve data such as funds and banking, it is 
                    not possible to remove the requirement for the second factor device. This is only possible in some situations for trading applications such as TWS.
                </p>
                `
            },
            {
                id: 'automated-login',
                title: 'Automated Login',
                content: `
                <p>
                    For security reasons, automated login to Client Portal API is not currently supported for individual clients. The API gateway was designed to require
                    the end user to manually enter their credentials into a web browser to authenticate their brokerage session. 
                </p>
                <p>
                    <b>Note:</b> Interactive Brokers is unable to provide recommendations or support for third-party solutions that provide a workaround around this requirement.
                </p>
                `
            },
            {
                id: 'invalid-certificate',
                title: 'Invalid SSL Certificate',
                content: `
                <p>
                    Since the gateway is running on your premises, the certificate needs to be created and self-signed by you, or offically signed by a trusted third-party. 
                    The gateway is similar to other webservers, such as Tomcat, which doesn't provide a certificate along with the release. To fix this issue, 
                    please see the certificate generation steps below:
                    <ol>
                        <li>Create a self-signed certificate by following the following <a href="https://www.sslshopper.com/article-how-to-create-a-self-signed-certificate-using-java-keytool.html">guide</a>.</li>     
                        <li>Place the generated *.jks certificate file in the 'root' folder in the gateway directory.</li>
                        <li>Update the sslCert field in the gateway configuration file with the details of the generated certificate</li>
                        <li>Restart the gateway</li>
                    </ol>
                </p>
                `
            },
            {
                id: 'pacing-limits',
                title: 'Pacing Limitations',
                content: `
                <p>
                    Interactive Brokers has implemented pacing limits on endpoints accessible via Client Portal API. Currently a limit of 10 requests per second exists.
                    In addition some endpoint specific limits are also in place. These limits can be found in the table below.
                </p>
                <p>
                    Where this limit is exceeded, the API will return a "429 Too Many Requests" exception. Violator IP addresses are put in a penalty box for 10 minutes.
                    After this period, the IP address is removed from the penalty box until another request exceeds the limit again. 
                    Repeat violator IP addresses can be permamently blocked until the issue is resolved. 
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Endpoint</th>
                            <th>Method</th>
                            <th>Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>/iserver/marketdata/snapshot</td>
                            <td>GET</td>
                            <td>10 req/s</td>
                        </tr>
                        <tr>
                            <td>/iserver/marketdata/history</td>
                            <td>GET</td>
                            <td>5 concurrent requests</td>
                        </tr>
                        <tr>
                            <td>/iserver/scanner/params</td>
                            <td>GET</td>
                            <td>1 req/15 mins</td>
                        </tr>
                        <tr>
                            <td>/iserver/scanner/run</td>
                            <td>POST</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/iserver/trades</td>
                            <td>GET</td>
                            <td>1 req/5 secs</td>
                        </tr>
                        <tr>
                            <td>iserver/orders</td>
                            <td>GET</td>
                            <td>1 req/5 secs</td>
                        </tr>
                        <tr>
                            <td>/iserver/account/pnl/partitioned</td>
                            <td>GET</td>
                            <td>1 req/5 secs</td>
                        </tr>
                        <tr>
                            <td>/portfolio/accounts</td>
                            <td>GET</td>
                            <td>1 req/5 secs</td>
                        </tr>
                        <tr>
                            <td>/portfolio/subaccounts</td>
                            <td>GET</td>
                            <td>1 req/5 secs</td>
                        </tr>
                        <tr>
                            <td>/pa/performance</td>
                            <td>POST</td>
                            <td>1 req/15 mins</td>
                        </tr>
                        <tr>
                            <td>/pa/summary</td>
                            <td>POST</td>
                            <td>1 req/15 mins</td>
                        </tr>
                        <tr>
                            <td>/pa/transactions</td>
                            <td>POST</td>
                            <td>1 req/15 mins</td>
                        </tr>
                        <tr>
                            <td>/trsv/secdef</td>
                            <td>POST</td>
                            <td>200 conids/request</td>
                        </tr>
                        <tr>
                            <td>/fyi/unreadnumber</td>
                            <td>GET</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/fyi/settings</td>
                            <td>GET</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/fyi/settings/{typecode}</td>
                            <td>POST</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/fyi/disclaimer/{typecode}</td>
                            <td>GET</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/fyi/disclaimer/{typecode}</td>
                            <td>PUT</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/fyi/deliveryoptions</td>
                            <td>GET</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/fyi/deliveryoptions/email</td>
                            <td>PUT</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/fyi/deliveryoptions/device</td>
                            <td>POST</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/fyi/deliveryoptions/{deviceId}</td>
                            <td>DELETE</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/fyi/notifications</td>
                            <td>GET</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/fyi/notifications/more</td>
                            <td>GET</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/fyi/notifications/{notificationId}</td>
                            <td>PUT</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/tickle</td>
                            <td>GET</td>
                            <td>1 req/sec</td>
                        </tr>
                        <tr>
                            <td>/sso/validate</td>
                            <td>GET</td>
                            <td>1 req/min</td>
                        </tr>
                    </tbody>
                </table>
                `
            },
            {
                id: 'bad-request',
                title: 'Bad Request Error',
                content: `
                <p>
                    A Bad Request may be returned from some endpoints in the case of an invalid JSON body, for instance if it has carriage returns/newlines. 
                    Please try first removing these and call the endpoint again.
                </p>
                `
            },
        ]
    },
    {
        category: 'Market Data',
        items: [
            {
                id: 'snapshot-request',
                title: 'Snapshot Requests',
                content: `
                <p>
                    Client Portal API allows API consumers to request market data snapshots for most instruments. 
                    In order to retrieve market data snapshots, the API consumer must first create a snapshot request subscription. 
                    The response contains details about the subscribed snapshot request, the symbol, and requested fields.
                    In order to retrieve the market data, subsequent calls to the <b>/marketdata/snapshot</b> endpoint must be made.
                </p>
                `
            },
            {
                id: 'option-chain',
                title: 'Option Chains',
                content: `
                <p>
                    When requesting market data for options, set the strike price to zero to retrieve the entire option chain for that symbol.
                </p>
                `
            }
        ]
    },
    {
        category: 'Account Data & Reports',
        items: [
            {
                id: 'portfolio-discrepancies',
                title: 'Portfolio Discrepancies',
                content: `
                <p>
                    Due to filtering differences accross our platform, some discrepancies in portfolio data obtained via Client Portal API may be present.
                    For comparison purposes, statemenents generated via Client Portal or via Flex Queries should be considered as reliable sources of information.
                </p>
                `
            },
            {
                id: 'generating-reports',
                title: 'Flex Queries',
                content: `
                <p>
                    Generating complex reports is not currently supported in Client Portal API. Interactive Brokers does provide an alternative API, Flex Web Service, which allows for the retrieval of pre-made reports, known as Flex Queries, from Client Portal via HTTPS. 
                    To learn more about Flex Query and the Flex Web Service API please refer to the official <a href="https://guides.interactivebrokers.com/am/am/reports/using_the_flex_web_service.htm" target="_blank">Flex Web Service API</a> documentation. 
                </p>
                <p>
                    <b>Note:</b> A live account must be used when creating Flex Queries.
                </p>
                `
            }
        ]
    },
]

export default workflowsIndividual;