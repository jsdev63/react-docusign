const callbackURL = process.env.NODE_ENV==='development'? "http://localhost:3000/ds/callback" : "https://react-docusign.jsdev63.now.sh/ds/callback"

export const config = {
    API_URL: "https://real-server.herokuapp.com/docusign",
    // API_URL: "http://192.168.0.223:5000/docusign",
    clientID: '12386521-a32f-412e-9cea-0406255430f9',
    clientSecret: '093ebd1c-8d64-460e-8857-992334541bc1',
    callbackURL: callbackURL,
    AuthURL: 'https://account-d.docusign.com/oauth'
}

