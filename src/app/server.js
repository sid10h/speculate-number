const express = require('express');
const app = express();
app.use(express.static('./dist/ng6-proj'));
app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/ng6-proj/' }
    );
});

app.listen(process.env.PORT || 8080);