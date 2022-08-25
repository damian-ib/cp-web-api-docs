<script setup>
import Warning from "@/components/Warning.vue";
</script>

<template>
  <div>
    <article>
      <h3>Session Authentication</h3>
      <warning>
        <p>
          When navigating to the Client Portal API Gateway login page, you may see a warning from your browser regarding a missing valid SSL certificate.
          This is expected. The API gateway does not come bundled with a valid certificate and it is up to the user to install one signed by themselves.
          For information on how to generate and install a valid gateway certificate, please see the following <a href="./workflows#invalid-certificate">article</a> in the workflows page. 
        </p>
      </warning>
      <p>
        An authenticated brokerage session is necessary to access order information, place orders, or receive market data via Client Portal API.
        Individual clients using Client Portal API are required to use the API Gateway in order to establish a brokerage session. There is currently
        no official workaround for this requirement.
        Other Interactive Brokers' trading applications such as TWS or IBKR Mobile also utilize a brokerage session.
      </p>
      <p>
        <b>Note:</b> A given username can only create a single brokerage session at any given time. 
        Launching TWS, IBKR mobile, logging in to Client Portal, or establishing a connection via third-party software using your Interactive Brokers' credentials, will disconnect the current Client Portal API brokerage session, and vice versa.
      </p>
    </article>
    <hr>
    <article>
      <h3>How can I tell if my brokerage session is authenticated?</h3>
      <p>
        The endpoint <b>/iserver/auth/status</b> can be used to determine the current authentication status of the session. 
        Once you have logged in using the Client Portal API Gateway, you can make a POST request to this endpoint to determine if your session is fully authenticated.
        If the session is fully authenticated, the response from this endpoint will contain the following JSON object:
        <div class="code-box">
            <pre class="language-json"><code>{'authenticated': true, 'connected': true, 'competing': false}</code></pre>
        </div>
      </p>
    </article>
    <hr>
    <article>
      <h3>How long does a session remain authenticated?</h3>
      <p>
        To ensure client account security, Interactive Brokers' trading solutions were designed with the need for the user to manually reauthenticate with the backend
        on a daily basis. As such, the maximum period of time that a Client Portal API session can remain authenticated is 24 hours.
      </p>
      <p>
        Daily maintenance of IBKR's servers could result in a disconnect earlier than the 24 hour period mentioned above.
        We advise disconnecting your session from your gateway and restarting it after the maintenance time to minimize any potential problems that may arise.
        Information on server reset times and system status updates can be found on the 
        <a href="https://www.interactivebrokers.com/en/software/systemStatus.php" target="_blank">System Status</a> page.
      </p>
    </article>
    <hr>
    <article>
      <h3>How can I prevent the session from timing out?</h3>
      <p>
        A Client Portal API brokerage session will timeout if no requests are received within a period of 5 minutes. In order to prevent the session from timing out, the 
        endpoint <b>/tickle</b> should be called on a regular basis. It is recommended to call this endpoint approximately every
        minute. 
      </p>
      <p>
        If the brokerage session has timed out but the session is still connected to the IBKR backend, the response to <b>/auth/status</b> returns 'connected':true and 'authenticated':false.
        Calling the <b>/reauthenticate</b> endpoint will start a new brokerage session.
      </p>
    </article>
    <hr>
    <article>
      <h3>Can I automate the Client Portal API authentication process?</h3>
      <p>
        There is currently no mechanism available on Interactive Brokers' end to permit individual clients to automate the
        brokerage session authentication process when using Client Portal API.
      </p>
    </article>
    <hr>
    <article>
      <h3>Can I use a third-party solution to automate the brokerage session authentication process?</h3>
      <p>
        Interactive Brokers does not recommend the use of third-party solutions to establish a brokerage
        session. This can put your account at risk from potentially malicious projects. 
      </p>
      <p>
        <b>Note:</b> Interactive Brokers is unable to provide support for third-party wrappers.
      </p>
    </article>
    <hr>
    <article>
      <h3>Is it possible to authenticate a live brokerage session without the use of a Two Factor Authentication (2FA) device?</h3>
      <p>
        The login process to the Client Portal API Gateway is the same as to Client Portal. As the Client Portal has access to sensitive information and 
        banking functionalities, two-factor authentication is mandatory for login.
      </p>
    </article>
    <hr>
  </div>
</template>