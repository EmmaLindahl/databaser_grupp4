<script setup>
import { ref } from 'vue'


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
  <div class="container">
    <div class="card" :class="{ flipped: isFlipped }">
      <div class="front">
        <div class="image-container-front">
          <img id="front-image" src="../pictures/background/form_plant1.png">
          <div class="text-image">
            <h1 id="h1-front-image">Happy Plant</h1>
            <h2 id="h2-front-image">Don't eat them before you</h2>
            <h3 id="h3-front-image">consult your local doctor</h3>
          </div>
        </div>
        <div class="card-content">
          <h1 id="h1-content">Add your own Plant</h1>
          <h2 id="h2-content">Carefully read and fill up all the inputs with your plant information</h2>
          <div :class="{ 'input-error': frontError && !formData.PlantName.value }">
            <input class="input-field" placeholder="Plant Name" v-model="formData.PlantName.value">
          </div>
          <div>
            <input class="input-field" placeholder="Family" v-model="formData.PlantFamilyName.value">
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
          <div class="Neon Neon-theme-dragdropbox">
            <input
              style="z-index: 999; opacity: 0; width: 320px; height: 200px; position: absolute; right: 0px; left: 0px; margin-right: auto; margin-left: auto;"
              name="files[]" id="filer_input2" multiple="multiple" type="file">
            <div class="Neon-input-dragDrop">
              <div class="Neon-input-inner">
                <div class="Neon-input-icon"><i class="fa fa-file-image-o"></i></div>
                <div class="Neon-input-text">
                  <h3>Drag & Drop files here</h3> <span style="display:inline-block; margin: 15px 0">or</span>
                </div><a class="Neon-input-choose-btn blue">Browse Files</a>
              </div>
            </div>
          </div>
          <div>
            <input class="input-field" placeholder="Species" v-model="formData.PlantSpeciesName.value">
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media screen and (max-height: 3000px) {

  .card {
    display: flex;
    width: 1000px;
    height: 600px;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    background-color: transparent;
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
    margin-bottom: 12rem;
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

  #front-image {
    width: 100%;
    height: 599px;
  }

  #back-image {
    position: relative;
    top: 60%;
    left: 45%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
  }

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
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  #h2-front-image {
    color: whitesmoke;
    position: absolute;
    bottom: 37%;
    right: 59%;
    margin-bottom: 5rem;
    font-weight: 100;
    font-size: 14px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  #h3-front-image {
    color: whitesmoke;
    position: absolute;
    bottom: 34%;
    right: 56%;
    margin-bottom: 5rem;
    font-weight: 100;
    font-size: 14px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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
    margin: 0 2rem;
    font-weight: 100;
    font-size: 17px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  #h2-back-image {
    color: whitesmoke;
    position: absolute;
    bottom: 69%;
    left: 69%;
    margin: 0 2rem;
    font-weight: 100;
    font-size: 18px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  #h3-back-image {
    color: whitesmoke;
    position: absolute;
    bottom: 65%;
    left: 74%;
    margin: 0 2rem;
    font-weight: 100;
    font-size: 18px;
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
    color: #555;
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

  @media only screen and (max-width: 1440px) and (min-height: 900px) {

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

/* Upload image css */
.Neon {
  font-family: sans-serif;
  font-size: 14px;
  color: #494949;
  position: relative;
}

.Neon * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.Neon-input-dragDrop {
  display: block;
  width: 380px;
  margin: 0 auto 20px auto;
  padding: 30px;
  color: grey;
  background: #fff;
  border: 2px solid #ccc;
  background-color: #f8f8f8;
  text-align: center;
  -webkit-transition: box-shadow 0.3s, border-color 0.3s;
  -moz-transition: box-shadow 0.3s, border-color 0.3s;
  transition: box-shadow 0.3s, border-color 0.3s;
}

.Neon-input-dragDrop .Neon-input-icon {
  font-size: 48px;
  margin-top: -10px;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.Neon-input-text h3 {
  margin: 0;
  font-size: 18px;
}

.Neon-input-text span {
  font-size: 12px;
}

.Neon-input-choose-btn.blue {
  color: #399c7e;
  border: 1px solid #399c7e;
}

.Neon-input-choose-btn {
  display: inline-block;
  padding: 8px 14px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  font-size: 12px;
  font-weight: bold;
  color: #8d9496;
  border-radius: 3px;
  border: 1px solid #c6c6c6;
  vertical-align: middle;
  background-color: #fff;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.05);
  -webkit-transition: all 0.2s;
  -moz-transition: all 0.2s;
  transition: all 0.2s;
}

@media screen and (max-height: 900px) {

  .card {
    display: flex;
    width: 800px;
    height: 480px;
    transform-style: preserve-3d;
    transition: transform 0.5s;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    background-color: transparent;
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
    margin-bottom: 8rem;
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

  #front-image {
    width: 100%;
    height: 480px;
    display: block;
    overflow: hidden;
  }

  #back-image {
    position: relative;
    top: 60%;
    left: 45%;
    transform: translate(-50%, -50%);
    width: 340px;
    height: 340px;
  }

  #h1-content {
    margin-right: 4.7rem;
    margin-bottom: .6rem;
    font-size: 24px;
    color: #553c30;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: 600;
  }

  #h2-content {
    margin: 0 4rem .9rem 3.3rem;
    font-size: 12px;
    color: #553c30;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    font-weight: 600;
  }

  .text-image {
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
    right: 58%;
    font-weight: 500;
    font-size: 35px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  #h2-front-image {
    color: whitesmoke;
    position: absolute;
    bottom: 34%;
    right: 58%;
    margin-bottom: 5rem;
    font-weight: 100;
    font-size: 12px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  #h3-front-image {
    color: whitesmoke;
    position: absolute;
    bottom: 31%;
    right: 55%;
    margin-bottom: 5rem;
    font-weight: 100;
    font-size: 12px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
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
    margin: 0 2rem;
    font-weight: 100;
    font-size: 14px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  #h2-back-image {
    color: whitesmoke;
    position: absolute;
    bottom: 69%;
    left: 67.5%;
    margin: 0 2rem;
    font-weight: 100;
    font-size: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  #h3-back-image {
    color: whitesmoke;
    position: absolute;
    bottom: 64.5%;
    left: 75%;
    margin: 0 1rem;
    font-weight: 100;
    font-size: 15px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .textarea-field {
    width: 300px;
    height: 70px;
    padding: 7px 14px;
    margin: .5rem;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 3px;
    background-color: #f8f8f8;
    font-size: 12px;
    resize: none;
  }

  .input-field {
    width: 300px;
    margin: .5rem;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 3px;
    background-color: #f8f8f8;
    font-size: 12px;
    padding: 7px 14px;
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
    width: 255px;
    margin-left: 0;
  }


  .question-mark-icon {
    height: 36px;
    width: 36px;
    font-size: 18px;
    border-radius: 3px;
    border: 2px solid #ccc;
    background-color: #f8f8f8;
    padding: 3px 8px 10px 8px;
    text-align: center;
    cursor: pointer;
    color: #555;
  }

  .alert-position-front {
    position: absolute;
    bottom: 100%;
    left: 50%;
    background-color: #ff8383;
    border: none;
    color: black;
    width: 50%;
    font-size: 12px;
  }

  .alert-position-back {
    position: absolute;
    bottom: 100%;
    right: 50%;
    background-color: #ff8383;
    border: none;
    color: black;
    width: 50%;
    font-size: 12px;
  }

  .alert-position-success {
    position: absolute;
    bottom: 100%;
    right: 50%;
    background-color: #50C878;
    border: none;
    color: black;
    width: 50%;
    font-size: 12px;
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
    width: 200px;
    background-color: #399c7e;
    color: whitesmoke;
    text-align: center;
    padding: 14px;
    border-radius: 6px;
    font-size: 12px;
    position: absolute;
    z-index: 1;
  }

  .custom-tooltip:hover .tooltiptext {
    visibility: visible;
  }

  .custom-tooltip .tooltiptext-binomial {
    top: 47%;
    left: 96%;
  }

  .custom-tooltip .tooltiptext-genus {
    top: 36.5%;
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

  @media only screen and (max-width: 1180px) {

    .custom-tooltip .tooltiptext-binomial {
      left: 91.2%;
      top: 27%;
      transform: translateX(-50%);
    }

    .custom-tooltip .tooltiptext-genus {
      left: 91.2%;
      top: 16%;
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
    font-size: 13px;
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
    bottom: 4%;
    right: 4%;
  }

  #next-button:hover {
    position: absolute;
    bottom: 4%;
    right: 4%;
    transform: translateX(5px);
  }

  #back-button {
    position: absolute;
    bottom: 4%;
    left: 4%;
  }

  #back-button:hover {
    position: absolute;
    bottom: 4%;
    left: 4%;
    transform: translateX(-5px);
  }

  #submit {
    position: absolute;
    bottom: 4%;
    left: 35%;
  }

  #submit:hover {
    position: absolute;
    bottom: 4%;
    left: 35%;
    transform: translateY(-5px);
  }

  /* Upload image css */
  .Neon {
    font-family: sans-serif;
    font-size: 14px;
    color: #494949;
    position: relative;
  }

  .Neon * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .Neon-input-dragDrop {
    display: block;
    width: 300px;
    margin: 0 auto 12px auto;
    padding: 23px;
    color: grey;
    background: #fff;
    border: 2px solid #ccc;
    background-color: #f8f8f8;
    text-align: center;
    -webkit-transition: box-shadow 0.3s, border-color 0.3s;
    -moz-transition: box-shadow 0.3s, border-color 0.3s;
    transition: box-shadow 0.3s, border-color 0.3s;
  }

  .Neon-input-dragDrop .Neon-input-icon {
    font-size: 48px;
    margin-top: -10px;
    -webkit-transition: all 0.3s ease;
    -moz-transition: all 0.3s ease;
    transition: all 0.3s ease;
  }

  .Neon-input-text h3 {
    margin: 0;
    font-size: 16px;
  }

  .Neon-input-text span {
    font-size: 10px;
  }

  .Neon-input-choose-btn.blue {
    color: #399c7e;
    border: 1px solid #399c7e;
  }

  .Neon-input-choose-btn {
    display: inline-block;
    padding: 7px 12px;
    outline: none;
    cursor: pointer;
    text-decoration: none;
    text-align: center;
    white-space: nowrap;
    font-size: 10px;
    font-weight: bold;
    color: #8d9496;
    border-radius: 3px;
    border: 1px solid #c6c6c6;
    vertical-align: middle;
    background-color: #fff;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.05);
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    transition: all 0.2s;
  }
}
</style>
