<template>
    <div id="headerContainer">
        <a href="http://localhost:5173/">All Plants</a>
        <a href="http://localhost:5173/upload">Add Plant</a>
        <h1>Header</h1>
    </div>
    <main>
        <img src="/src/pictures/logo/logo.png" alt="logo">
        <div id="caption">
            <h1>Happy Plant</h1>
            <h2>Don't eat them before you consult your local doctor</h2>
        </div>
        <ul>
            <li><a>Home</a></li>
            <li><a>Add your own plant</a></li>
        </ul>
    </main>
</template>

<style scoped>
#headerContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
}
</style>
<style scoped>
main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;

}

img {
    width: 100px;
}

h1,
h2 {
    text-align: center;
}

ul {
    list-style: none;
    background-color: #f2f2f2;
    padding: 10px 15px;
    text-align: center;
}

li {
    margin: 5px;
    font-family: Arial, Helvetica, sans-serif;
}

a {
    padding: 0px 5px;
    border: none;
    align-self: center;
    cursor: pointer;
    font-size: 15px;
    border-radius: 50px;
}

a:hover {
    /*   padding: 5px 10px; */
    background-color: #e6e6e6;
    box-shadow: 2px 2px grey;
}
</style>
