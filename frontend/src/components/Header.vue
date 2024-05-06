<template>
    <main>
        <a href="/"><img src="/src/pictures/logo/logo.png" alt="logo"></a>
        <div id="caption">
            <h1>Happy Plant</h1>
            <h2>Don't eat them before you consult your local doctor</h2>
        </div>
        <ul>
            <li><a href="/">All plants</a></li>
            <li><a href="/upload">Add plant</a></li>
        </ul>
    </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  border-bottom: solid 2px lightgrey;
  background-color: rgba(247, 247, 247, 0.4);
}

img {
  width: 100px;
}

h1 {
  font-size: 2em;
  font-weight: bold;
  font-family: none;
  margin: 1rem;
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
  font-family: none;
}

h1,
h2 {
  text-align: center;
  color: #003300;
}

ul {
  list-style: none;
  /*  background-color: #f2f2f2; */
  padding: 10px 15px;
  text-align: center;
}

li {
  margin: 5px;
  padding: 3px 5px;
  font-family: Arial, Helvetica, sans-serif;
}

a {
  padding: 0px 5px;
  border: none;
  align-self: center;
  cursor: pointer;
  font-size: 18px;

  border-radius: 50px;
  text-decoration: none;
}

a:link {
  color: blue;
}

a:hover {
  /*   padding: 5px 10px; */
  background-color: #e6e6e6;
  box-shadow: 2px 2px grey;
}

a:visited {
  color: #000066;
}
</style>
