function hashString(bookName) {
    // Convertir el nombre del libro a una cadena de texto
    bookName = String(bookName);
  
    // Crear un hash a partir del nombre del libro
    // utilizando el algoritmo de hash de Jenkins
    let hash = 0;
    for (let i = 0; i < bookName.length; i++) {
      hash += bookName.charCodeAt(i);
      hash = (hash << 5) - hash + 0x55555555;
      hash &= hash;
    }
  
    // Devolver el hash como un número entero
    return hash;
  }

export default hashString