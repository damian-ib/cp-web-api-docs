<template>
  <div>
    <section>
      <h3>Step One: Create a free Interactive Brokers account</h3>
      <p>
        In order to use Client Portal API an active Interactive Brokers account is required. If you do not have an account, you can create one for free by clicking the button below.
        Free trial accounts are not currently supported, however support for free trial accounts is coming soon. 
      </p>
      <p>
        <b>Note:</b> The account creation process may take up to 48 hours to complete.
      </p>
      <div class="action-buttons">
        <a href="https://www.interactivebrokers.com/en/index.php?f=46380#open-account" target="_blank">Create a free <b>account</b></a>
      </div>
    </section>
    <hr>
    <section>
      <h3>Step Two: Download and unzip the Client Portal API Gateway</h3>
      <p>
        Individual clients using Client Portal API will need to use a Java-based API gateway in order to access protected endpoints. 
        The gateway is responsible for routing requests to the backend and ensuring that the brokerage session is authenticated.
        The Client Portal API gateway can be downloaded <a href="https://www.interactivebrokers.com/en/index.php?f=5041" target="_blank">here</a>, or, by clicking on the Gateway card in the Downloads section of this page.
      </p>
      <p>
        <b>Note:</b> Once a new version of the Client Portal API Gateway is released, it is recommended that you download this new version. 
        Details about new Gateway releases can be found in the <a href="./changelog">Changelog</a>.
      </p>
    </section>
    <hr>
    <section>
      <h3>Step Three: Download and install Java</h3>
      <p>
        As the Client Portal API Gateway was built using Java, a working installation of the Java Runtime Environment (JRE) is required. The minimum requirement is Java 8 update 192.
        In order to check if you have a working installation of Java, open a terminal and run the following command:
        <div v-highlight class="code-box">
          <pre class="language-json"><code>java --version</code></pre>
        </div>
      </p>
      <p>
        If Java is installed and correctly configured you should see information about the currently installed version, otherwise an error is raised. An example response is the following:
        <div v-highlight class="code-box">
          <pre class="language-json"><code>java 17.0.1 2021-10-19 LTS</code></pre>
        </div>
        <p>
          If you don't currently have Java installed you can download it by clicking on the Java card in the Downloads section of this page.
        </p>
      </p>
    </section>
    <hr>
    <section>
      <h3>Step Four: Run the API Gateway</h3>
      <p>
        Using the terminal, navigate to the directory where the gateway has been unzipped. For example:
      </p>
      <div v-highlight class="code-box">
        <pre class="language-json"><code>cd C:/Users/Example/Desktop/Cp Gateway</code></pre>
      </div>
      <p>
        On Windows, launch the gateway using the following command:
      </p>
      <div v-highlight class="code-box">
        <pre class="language-json"><code>bin\run.bat root\conf.yaml</code></pre>
      </div>
      <p>
        And in the case of Unix systems:
      </p>
      <div v-highlight class="code-box">
        <pre class="language-json"><code>bin/run.sh root/conf.yaml</code></pre>
      </div>
    </section>
    <hr>
    <section>
      <h3>Step Five: Authenticate the brokerage session</h3>
      <p>
        Once the gateway is running, you will need to authenticate the session. In order to do so, navigate to <a href="https://localhost:5000">https://localhost:5000</a> on your local network and enter
        your username and password. The message 'Client Login Succeeds' is displayed if the login was successful.
      </p>
      <p>
        <b>Tip:</b> By default, the gateway will listen on port 5000. To change this update the conf.yaml file found in the 'root' directory of the gateway.
      </p>
    </section>
    <hr>
    <section>
      <h3>Where to go from here?</h3>
      <p>
        Ensure your session is authenticated by following the tips and tricks on the <a href="./authentication">Authentication</a> page. 
      </p>
      <p>  
        Once you are successful in authenticating, review the available endpoints on the <a href="./endpoints">Endpoints</a> page. 
      </p>
      <p>
        Websockets can retrieve and deliver streaming data. For more information on how to use websockets, see the <a href="./websockets">Websockets</a> page.
      </p>
      <p>
        Once you have reviewed pages above, go through the <a href="./workflows">Workflows</a> to understand the use cases.
      </p>
      <p>
        <b>Good luck! 🍀</b>
      </p>
    </section>
    <hr>
  </div>
</template>

<style scoped>
.action-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.action-buttons a {
  font-weight: normal;
  border: 1px;
  padding: 1rem;
  border-style: solid;
  border-color: #db1222;
  background-color: white;
  color: #db1222;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  font-size: medium;
}

.action-buttons a:hover {
  background-color: #db1222;
  color: white;
}

.account {
  width: 233px;
}
</style>