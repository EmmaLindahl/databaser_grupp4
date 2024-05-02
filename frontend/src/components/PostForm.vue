<script setup>

import { ref } from 'vue'


const isFlipped = ref(false)

function flipCard() {
  isFlipped.value = !isFlipped.value
}

</script>



<template>
  <div class="container">
    <div class="card" :class="{ flipped: isFlipped }">
      <div class="front">

        <div class="image-container-front">
          <!-- <img src="../assets/red_flower.png" alt="Flower" id="flower-image"> -->
          <div id="flower-image"></div>
          <div class="text-image">
            <h1 id="h1-image">Happy Plant</h1>
            <h2 id="h2-image">Don't eat them before you contact your local doctor</h2>
          </div>

        </div>
        <div class="card-content">
          <!-- <div class="form-content"> -->
          <h1 id="h1-content">Add your own Plant</h1>
          <h2 id="h2-content">Carefully read and fill up all the inputs with your plant information</h2>

          <div>
            <input class="input-field" placeholder="Binomial">
          </div>
          <div>
            <input class="input-field" placeholder="Family">
          </div>

          <div>
            <input class="input-field" placeholder="Genus">
          </div>
          <div>
            <textarea class="textarea-field" placeholder="Description"></textarea>
          </div>
          <button class="button" id="next-button" @click="flipCard">Next ➔</button>
          <!-- </div> -->
        </div>
      </div>

      <div class="back">
        <div class="card-content">
          <div>
            <input class="input-field" placeholder="Species">
          </div>

          <div>
            <textarea class="textarea-field" placeholder="Habitat"></textarea>
          </div>
          <div>
            <textarea class="textarea-field" placeholder="Use"></textarea>
          </div>
          <button class="button" id="back-button" @click="flipCard">Back</button>
          <button class="button" id="add-button" @click="addPlant">Add Plant</button>
        </div>
        <div class="image-container-back">

        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* .container {} */

.card {

  display: flex;
  /* justify-content: center;
  align-items: center; */
  width: 1200px;
  height: 800px;
  /* border: red solid 5px; */
  transform-style: preserve-3d;
  transition: transform 0.5s;


}

.front,
.back {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: hidden;
  background-color: white;
  border-radius: 10px;


}

/* .front { */
/* background-color: white; */
/* border-radius: 10px; */

/* justify-items: center; */
/* align-items: center; */
/* background-color: #399c7e; */
/* display: flex; */
/* align-items: center; */
/* justify-content: center; */
/* } */

.back {
  /* background-color: white; */

  /* background-color: #399c7e; */
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  transform: rotateY(180deg);

}

.flipped {
  transform: rotateY(180deg);
}

.card-content {
  flex: 1;
  /* position: relative; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  /* display: flex; */
  /* justify-items: center;
  align-items: center; */
  /* border: red solid 5px; */
  margin-bottom: 15rem;
}



.image-container-front,
.image-container-back {
  flex: 1;
  height: 100%;
  background-color: #399c7e;
  /* border: red solid 5px; */

}

.image-container-front {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.image-container-back {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

/* #flower-image { */
/* width: 500px;
  height: 500px; */
/* mix-blend-mode: multiply; */
/* background-color: white; */
/* background-image: url('../assets/red_flower.png'); */
/* background-size: cover; */
/* or contain, depending on your preference */
/* background-color: transparent;
  background-blend-mode: normal; */
/* } */

#h1-content {
  margin-right: 7.5rem;
  margin-bottom: .8rem;
  font-size: 35px;
  color: #553c30;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

#h2-content {
  margin: 0 5rem 8rem 5rem;
  font-size: 18px;
  color: #553c30;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

}

.textarea-field {
  width: 450px;
  height: 150px;
  padding: 12px 20px;
  margin: .5rem;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  resize: none;
  font-family: Arial, sans-serif;


}

.input-field {
  width: 450px;
  margin: .5rem;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 16px;
  padding: 12px 20px;

  /* margin: 8px 0; */
}

.textarea-field:focus,
.input-field:focus {
  border-color: #399c7e;
  outline: none;
}


/* <button class="button-5" role="button">Button 5</button> */

/* Button */
.button {
  background-color: #399c7e;
  border: none;
  border-radius: .25rem;
  box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
  color: #fff;
  cursor: pointer;
  font-family: Arial, sans-serif;
  font-size: 20px;
  letter-spacing: .5px;
  font-weight: 600;
  justify-content: center;
  line-height: 1.25;
  padding: calc(.875rem - 1px) calc(1.5rem - 1px);
  transition: all 250ms;
}

.button:hover,
.button:focus {
  background-color: #4ebc9b;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
}

/* .button:hover {
  transform: translateX(5px);
} */

#next-button {
  position: absolute;
  bottom: 5%;
  right: 5%;
}

#next-button:hover {
  position: absolute;
  bottom: 5%;
  right: 5%;
  transform: translateX(5px);

}

#back-button {
  position: absolute;
  bottom: 5%;
  left: 5%;
}

#back-button:hover {
  position: absolute;
  bottom: 5%;
  left: 5%;
  transform: translateX(-5px);

}

#add-button {
  position: absolute;
  bottom: 5%;
  left: 33%;
}

#add-button:hover {
  position: absolute;
  bottom: 5%;
  left: 33%;
  transform: translateY(-5px);

}


@media screen and (max-height: 1000px) {
  .card {

    display: flex;
    width: 1000px;
    height: 600px;
    transform-style: preserve-3d;
    transition: transform 0.5s;


  }

  /* .front { */
  /* background-color: white; */
  /* border-radius: 10px; */

  /* justify-items: center; */
  /* align-items: center; */
  /* background-color: #399c7e; */
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  /* } */

  .back {
    /* background-color: white; */

    /* background-color: #399c7e; */
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center; */
    transform: rotateY(180deg);

  }

  .flipped {
    transform: rotateY(180deg);
  }

  .card-content {
    flex: 1;
    /* position: relative; */
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    /* display: flex; */
    /* justify-items: center;
  align-items: center; */
    /* border: red solid 5px; */
    margin-bottom: 15rem;
  }



  .image-container-front,
  .image-container-back {
    flex: 1;
    height: 100%;
    background-color: #399c7e;
    /* border: red solid 5px; */

  }

  .image-container-front {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .image-container-back {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  /* #flower-image { */
  /* width: 500px;
  height: 500px; */
  /* mix-blend-mode: multiply; */
  /* background-color: white; */
  /* background-image: url('../assets/red_flower.png'); */
  /* background-size: cover; */
  /* or contain, depending on your preference */
  /* background-color: transparent;
  background-blend-mode: normal; */


  /* } */

  #h1-content {
    margin-right: 7.1rem;
    margin-bottom: .8rem;
    font-size: 28px;
    color: #553c30;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }

  #h2-content {
    margin: 0 4rem 4rem 4rem;
    font-size: 15px;
    color: #553c30;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  }

  .text-image {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: 0 3rem;
  }

  #h1-image {
    color: whitesmoke;
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: 35px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  }

  #h2-image {
    color: whitesmoke;
    margin-bottom: 5rem;
    font-weight: 100;
    font-size: 14px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  }

  .textarea-field {
    width: 380px;
    height: 90px;
    padding: 10px 18px;
    margin: .5rem;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 3px;
    background-color: #f8f8f8;
    font-size: 14px;
    resize: none;
    font-family: Arial, sans-serif;


  }

  .input-field {
    width: 380px;
    margin: .5rem;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 3px;
    background-color: #f8f8f8;
    font-size: 14px;
    padding: 10px 18px;

    /* margin: 8px 0; */
  }

  .textarea-field:focus,
  .input-field:focus {
    border-color: #399c7e;
    outline: none;
  }


  /* <button class="button-5" role="button">Button 5</button> */

  /* Button */
  .button {
    background-color: #399c7e;
    border: none;
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    color: #fff;
    cursor: pointer;
    font-family: Arial, sans-serif;
    font-size: 16px;
    letter-spacing: .5px;
    font-weight: 600;
    justify-content: center;
    line-height: 1.25;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    transition: all 250ms;
  }

  .button:hover,
  .button:focus {
    background-color: #4ebc9b;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }

  /* .button:hover {
  transform: translateX(5px);
} */

  #next-button {
    position: absolute;
    bottom: 5%;
    right: 5%;
  }

  #next-button:hover {
    position: absolute;
    bottom: 5%;
    right: 5%;
    transform: translateX(5px);

  }

  #back-button {
    position: absolute;
    bottom: 5%;
    left: 5%;
  }

  #back-button:hover {
    position: absolute;
    bottom: 5%;
    left: 5%;
    transform: translateX(-5px);

  }

  #add-button {
    position: absolute;
    bottom: 5%;
    left: 33%;
  }

  #add-button:hover {
    position: absolute;
    bottom: 5%;
    left: 33%;
    transform: translateY(-5px);

  }
}
</style>
