// fetch api

const loadAIData = (isSliced) =>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res => res.json())
    .then(data => displayAIData(data.data.tools, isSliced));
}

// display AI function
const displayAIData = (AIDatas, isSliced) =>{
    // start spinner
    toggleSpinner(true);
    const AIDataContainer = document.getElementById('AI-data-container');
    AIDataContainer.textContent = "";
    const seeAllBtn = document.getElementById('see-all');
    console.log("seeeee")
        if(!isSliced){
            AIDatas = AIDatas.slice(0,6);
            seeAllBtn.classList.remove('d-none');   
        }        
        AIDatas.forEach(AIData =>{
        // console.log(AIData);
        const AIDataDiv = document.createElement('div');
        AIDataDiv.classList.add('col');
        AIDataDiv.innerHTML = `
        <div class="card h-100 p-3">
                <img src="${AIData.image}" class="card-img-top " alt="..." />
                <div class="card-body">
                    <h4>Features</h4>
                    <ol>
                        <li>${AIData.features[0]? AIData.features[0]: 'Not Available'}</li>
                        <li>${AIData.features[1]? AIData.features[1]: 'Not Available'}</li>
                        <li>${AIData.features[2]? AIData.features[2]: 'Not Available'}</li>
                    </ol>
                    <hr>      
                    <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">${AIData.name}</h5>
                        <p class="fw-light"><i class="fa-solid fa-calendar-days"></i> <span>${AIData.published_in}</span></p>
                    </div>
                    <div>
                    <button class=" border border-0 rounded-circle bg-danger-subtle"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                    </div>
                </div>
              </div>
        `;
        AIDataContainer.appendChild(AIDataDiv);
    })
    // stop spninner
    toggleSpinner(false);
    // hide see all button
    // seeAllBtn.classList.add('d-none');
     
}

// Toggle spninner function
const toggleSpinner = isLoading =>{
    const spinnerDiv = document.getElementById('spinner');
    if(isLoading){
        spinnerDiv.classList.remove('d-none');
    }
    else{
        spinnerDiv.classList.add('d-none');
    }
}

// See all button function
document.getElementById('see-all').addEventListener('click', function(){
    loadAIData(true);
});

loadAIData();