

const generatePassword = async () => { 
    const code = Math.floor(Math.random() * 1000000000);
    console.log(code);
    return code;
}
module.exports = generatePassword