console.log(document.cookie); 
if(document.cookie.includes('NotAuth')) {
    alert('Por favor, ingrese un nombre y contraseña válidos');
}
