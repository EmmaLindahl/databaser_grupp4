<script setup>
// import { Tooltip } from 'bootstrap';

// import '../assets/js/bootstrap'
import { ref, onMounted } from 'vue'


const
  isFlipped = ref(false),
  frontError = ref(false),
  backError = ref(false),
  success = ref(false)


const formData = {
  PlantName: ref(''),
  PlantBinomialName: ref(''),
  PlantGenusName: ref(''),
  PlantFamilyName: ref(''),
  PlantSpeciesName: ref(''),
  descriptionInput: ref(''),
  habitatInput: ref(''),
  useInput: ref('')

}

// let tooltipList = []

// onMounted(() => {
//   const tooltipTriggerList = [...document.querySelectorAll('[data-bs-toggle="tooltip"]')];
//   tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
// });

// $(function () {
//   $('[data-toggle="tooltip"]').tooltip()
// })
// $(function () {
//   $('[data-toggle="tooltip"]').tooltip();
// })


function flipCard() {
  if (formData.PlantName.value && formData.descriptionInput.value !== "") {
    isFlipped.value = !isFlipped.value
    frontError.value = false

  } else {
    frontError.value = true

  }
}

async function addPlant() {
  if (formData.habitatInput.value && formData.useInput.value !== "") {
    backError.value = false
    success.value = true

    try {
      const response = await fetch('http://localhost:3000/api/Plants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          PlantName: formData.PlantName.value,
          PlantBinomialName: formData.PlantBinomialName.value,
          PlantGenusName: formData.PlantGenusName.value,
          PlantFamilyName: formData.PlantFamilyName.value,
          PlantSpeciesName: formData.PlantSpeciesName.value


        })

      })
      const responseData = await response.json()
      console.log(responseData)
    } catch (error) {
      console.error('Error', error)

    }

    try {
      const response = await fetch('http://localhost:3000/api/PlantInfos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          descriptionInput: formData.descriptionInput.value,
          habitatInput: formData.habitatInput.value,
          useInput: formData.useInput.value


        })

      })
      const responseData = await response.json()
      console.log(responseData)
    } catch (error) {
      console.error('Error', error)

    }

  } else {
    backError.value = true

  }

}




</script>



<template>

  <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> -->
  <div class="container">
    <div class="card" :class="{ flipped: isFlipped }">
      <div class="front">

        <div class="image-container-front">
          <!-- <img src="../assets/red_flower.png" alt="Flower" id="flower-image"> -->
          <!-- <div id="flower-image"> -->
          <img id="front-image" src="../pictures/background/form_plant1.png">
          <!-- </div> -->
          <div class="text-image">
            <h1 id="h1-front-image">Happy Plant</h1>
            <h2 id="h2-front-image">Don't eat them before you</h2>
            <h3 id="h3-front-image">consult your local doctor</h3>
            <!-- <div class="white-line"></div> -->

          </div>

        </div>
        <div class="card-content">
          <!-- <div class="form-content"> -->
          <h1 id="h1-content">Add your own Plant</h1>
          <h2 id="h2-content">Carefully read and fill up all the inputs with your plant information</h2>
          <div :class="{ 'input-error': frontError && !formData.PlantName.value }">
            <input class="input-field" placeholder="Plant Name" v-model="formData.PlantName.value">
          </div>
          <!-- <div class="form-row"> -->
          <div>
            <input class="input-field" placeholder="Family" v-model="formData.PlantFamilyName.value">
            <!-- <div class="question-mark-icon custom-tooltip">&#63;
              <span class="tooltiptext-family tooltiptext">Binomial means a two-part name used to
                identify a specific species, with the first part indicating the
                genus and the second part denoting the species within that
                genus.</span>
            </div> -->
          </div>
          <div class="form-row">
            <input class="input-field question-mark" placeholder="Genus" v-model="formData.PlantGenusName.value">
            <div class="question-mark-icon custom-tooltip">&#63;
              <span class="tooltiptext-genus tooltiptext">Genus is a category
                in plant classification above species and below family, comprising
                species with similar characteristics and sharing a common ancestor.</span>
            </div>
          </div>
          <div class="form-row">
            <input class="input-field question-mark" placeholder="Binomial" v-model="formData.PlantBinomialName.value">
            <div class="question-mark-icon custom-tooltip">&#63;
              <span class="tooltiptext-binomial tooltiptext">Binomial means a two-part name used to
                identify a specific species, with the first part indicating the
                genus and the second part denoting the species within that
                genus.</span>
            </div>
          </div>
          <div :class="{ 'input-error': frontError && !formData.descriptionInput.value }">
            <textarea class="textarea-field" placeholder="Description"
              v-model="formData.descriptionInput.value"></textarea>
          </div>
          <div v-if="frontError">
            <div class="alert alert-danger alert-dismissible fade show alert-position-front" role="alert">
              <strong>Oops!</strong> It seems you forgot to fill in some required fields.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <button class="button" id="next-button" @click="flipCard">Next ➔</button>
        </div>
      </div>

      <div class="back">
        <div class="card-content">
          <div v-if="backError">
            <div class="alert alert-danger alert-dismissible fade show alert-position-back" role="alert">
              <strong>Oops!</strong> It seems you forgot to fill in some required fields.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div v-if="success">
            <div class="alert alert-success alert-dismissible fade show alert-position-success" role="alert">
              <strong>Excellent!</strong> Your input has been successfully stored.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <!-- <div class="form-row"> -->
          <div>
            <input class="input-field" placeholder="Species" v-model="formData.PlantSpeciesName.value">
            <!-- <div class="question-mark-icon custom-tooltip">&#63;
              <span class="tooltiptext-species tooltiptext">Binomial means a two-part name used to
                identify a specific species, with the first part indicating the
                genus and the second part denoting the species within that
                genus.</span>
            </div> -->
          </div>

          <div :class="{ 'input-error': backError && !formData.habitatInput.value }">
            <textarea class="textarea-field" placeholder="Habitat" v-model="formData.habitatInput.value"></textarea>
          </div>
          <div :class="{ 'input-error': backError && !formData.useInput.value }">
            <textarea class="textarea-field" placeholder="Use" v-model="formData.useInput.value"></textarea>
          </div>
          <button class="button" id="back-button" @click="flipCard">Back</button>
          <button class="button" id="submit" @click="addPlant">Submit</button>
        </div>
        <div class="image-container-back">
          <img id="back-image" src="../pictures/background/pngegg.png">
          <h1 id="h1-back-image">Once you've filled out the form,
            click the "Submit" button to add the plant to our database.</h1>
          <h2 id="h2-back-image">Thank you for contributing</h2>
          <h3 id="h3-back-image">to our plant collection!</h3>
          <!-- <img id="back-image1" src="../pictures/background/hanging_plant.png"> -->
        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>
/* .container {} */
/* @import '../assets/css/bootstrap.css'; */


/* body { */
/* background-color: white; */
/* background-image: url("./pictures/background/succulent.jpg");
  background-repeat: no-repeat;
  background-size: cover; */
/* } */

/* .card {

  display: flex;
  width: 1200px;
  height: 800px;
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

.back {
  transform: rotateY(180deg);
}

.flipped {
  transform: rotateY(180deg);
}

.card-content {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 15rem;
}


.image-container-front,
.image-container-back {
  flex: 1;
  height: 100%;
  background-color: #399c7e;

}

.image-container-front {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.image-container-back {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}


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
}

.textarea-field:focus,
.input-field:focus {
  border-color: #399c7e;
  outline: none;
}

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

} */


@media screen and (max-height: 3000px) {

  /* @import '../assets/css/bootstrap.css'; */

  /* @import "~bootstrap/dist/css/bootstrap.min.css"; */

  .card {

    display: flex;
    width: 1000px;
    height: 600px;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;


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

  .back {
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
    margin-bottom: 12rem;
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

  /* .flower-image {
    width: 500px;
    height: 500px;
    overflow: hidden;
  } */

  #front-image {
    /* width: 100%; */
    /* height: 100%; */
    /* background-size: cover; */
    width: 100%;
    height: 600px;
    display: block;
    overflow: hidden;
    /* background-color: transparent; */

    /* filter: grayscale(100%); */
    /* mix-blend-mode: multiply; */
    /* background-color: white; */
    /* background-image: url('../pictures/logo/form_plant.svg'); */
    /* background-size: cover; */
    /* or contain, depending on your preference */
    /* background-color: transparent;
    background-blend-mode: normal; */


  }

  #back-image {
    position: relative;
    top: 60%;
    left: 45%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
  }

  /* #back-image1 {
    position: relative;
    bottom: 40%;
    left: 80%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
  } */


  #h1-content {
    margin-right: 7.1rem;
    margin-bottom: .8rem;
    font-size: 28px;
    color: #553c30;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: 600;
  }

  #h2-content {
    margin: 0 4rem 2rem 4rem;
    font-size: 15px;
    color: #553c30;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: 600;

  }

  .text-image {
    /* height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: 0 3rem;
  }

  #h1-front-image {
    color: whitesmoke;
    position: absolute;
    bottom: 54%;
    right: 59%;
    font-weight: 500;
    font-size: 40px;
    /* font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    /* Horizontal offset, vertical offset, blur radius, shadow color */

  }

  #h2-front-image {
    color: whitesmoke;
    position: absolute;
    bottom: 37%;
    right: 59%;
    margin-bottom: 5rem;
    font-weight: 100;
    font-size: 14px;
    /* font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    /* Horizontal offset, vertical offset, blur radius, shadow color */

  }

  #h3-front-image {
    color: whitesmoke;
    position: absolute;
    bottom: 34%;
    right: 56%;
    margin-bottom: 5rem;
    font-weight: 100;
    font-size: 14px;
    /* font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    /* Horizontal offset, vertical offset, blur radius, shadow color */

  }

  .white-line {
    position: absolute;
    bottom: 50%;
    right: 70%;
    width: 150px;
    height: 3px;
    background-color: whitesmoke;
    transform: rotate(35deg);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  #h1-back-image {
    color: whitesmoke;
    position: absolute;
    bottom: 85%;
    left: 50%;
    /* margin-bottom: 5rem; */
    margin: 0 2rem;
    font-weight: 100;
    font-size: 17px;
    /* font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    /* Horizontal offset, vertical offset, blur radius, shadow color */

  }

  #h2-back-image {
    color: whitesmoke;
    position: absolute;
    bottom: 69%;
    left: 69%;
    /* margin-bottom: 5rem; */
    margin: 0 2rem;
    font-weight: 100;
    font-size: 18px;
    /* font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  #h3-back-image {
    color: whitesmoke;
    position: absolute;
    bottom: 65%;
    left: 74%;
    /* margin-bottom: 5rem; */
    margin: 0 2rem;
    font-weight: 100;
    font-size: 18px;
    /* font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif; */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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
    /* font-family: Arial, sans-serif; */


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

  .form-row {
    display: flex;
    align-items: center;
    justify-items: center;
  }

  .question-mark {
    width: 328px;
    margin-left: 0;

  }


  .question-mark-icon {
    height: 45px;
    width: 45px;
    font-size: 20px;
    border-radius: 3px;
    border: 2px solid #ccc;
    background-color: #f8f8f8;
    padding: 6px 8px 10px 8px;
    text-align: center;
    cursor: pointer;
    /* align-items: center; */
    /* Add some padding to create space between the icon and the border */

    /* Adjust the size of the icon */
    color: #555;
    /* Adjust the color of the icon */
    /* font-weight: bold; */
    /* Optionally, make the icon bold */
  }

  .alert-position-front {
    position: absolute;
    bottom: 100%;
    left: 50%;
    background-color: #ff8383;
    border: none;
    color: black;
    width: 50%;
  }

  .alert-position-back {
    position: absolute;
    bottom: 100%;
    right: 50%;
    background-color: #ff8383;
    border: none;
    color: black;
    width: 50%;
  }

  .alert-position-success {
    position: absolute;
    bottom: 100%;
    right: 50%;
    background-color: #50C878;
    border: none;
    color: black;
    width: 50%;
  }

  .input-error textarea {
    border-color: #ff8383;
  }

  .input-error input {
    border-color: #ff8383;
  }

  /* Tooltip */
  .custom-tooltip .tooltiptext {
    visibility: hidden;
    width: 250px;
    background-color: #399c7e;
    color: whitesmoke;
    text-align: center;
    /* padding: 5px 0; */
    padding: 18px;
    border-radius: 6px;
    font-size: 16px;
    position: absolute;
    z-index: 1;
  }

  .custom-tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .custom-tooltip .tooltiptext-binomial {
    top: 43%;
    left: 96%;
  }

  .custom-tooltip .tooltiptext-genus {
    top: 35%;
    left: 96%;
  }

  .custom-tooltip .tooltiptext::after {
    content: " ";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #399c7e transparent transparent;
  }

  .custom-tooltip .tooltiptext {
    opacity: 0;
    transition: opacity 1s;
  }

  .custom-tooltip:hover .tooltiptext {
    opacity: 1;
  }

  @media only screen and (max-width: 1440px) {

    .custom-tooltip .tooltiptext-binomial {
      left: 91.7%;
      top: 20%;
      transform: translateX(-50%);
    }

    .custom-tooltip .tooltiptext-genus {
      left: 91.7%;
      top: 13%;
      transform: translateX(-50%);
    }

    .custom-tooltip .tooltiptext::after {
      top: 100%;
      left: 50%;
      margin-top: 0;
      margin-left: -5px;
      border-color: #399c7e transparent transparent transparent;
    }
  }


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

  #submit {
    position: absolute;
    bottom: 5%;
    left: 35%;
  }

  #submit:hover {
    position: absolute;
    bottom: 5%;
    left: 35%;
    transform: translateY(-5px);

  }
}

@media screen and (max-height: 700px) {
  .card {

    display: flex;
    width: 800;
    height: 500px;
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
    margin-bottom: 10rem;
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
    margin-right: 7.4rem;
    margin-bottom: .8rem;
    font-size: 24px;
    color: #553c30;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }

  #h2-content {
    margin: 0 5rem 1rem 5rem;
    font-size: 12px;
    color: #553c30;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  }

  .text-image {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    margin: 0 2rem;
  }

  #h1-image {
    color: whitesmoke;
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: 30px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  }

  #h2-image {
    color: whitesmoke;
    margin-bottom: 5rem;
    font-weight: 100;
    font-size: 12px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;

  }

  .textarea-field {
    width: 350px;
    height: 80px;
    padding: 8px 16px;
    margin: .5rem;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 3px;
    background-color: #f8f8f8;
    font-size: 12px;
    resize: none;
    font-family: Arial, sans-serif;


  }

  .input-field {
    width: 350px;
    margin: .5rem;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 3px;
    background-color: #f8f8f8;
    font-size: 12px;
    padding: 8px 16px;

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
    font-size: 14px;
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
