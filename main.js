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
                    <button 
                    onclick = "loadSingleDataInfo('${AIData.id}')"
                    class=" border border-0 rounded-circle bg-danger-subtle"
                    data-bs-toggle="modal"
                    data-bs-target="#AIDataModal">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
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

// Load Single AI Data Info
const loadSingleDataInfo = id =>{
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
    .then(res => res.json())
    .then(data => displayAIDataInfo(data.data));
}

// display Single AI data info
const displayAIDataInfo = singleData =>{
    console.log(singleData.input_output_examples);
    // console.log(singleData.features);
    const modalTitle = document.getElementById('AIDataModalLabel');
    modalTitle.innerText = singleData.tool_name;
    const dataDesc = document.getElementById('data-description');
    dataDesc.innerText = singleData.description;

    // single data features list
    const featuresList = singleData.features;
    const featuresListDiv = document.getElementById('single-data-features');
    featuresListDiv.innerHTML = "";
    featuresListDiv.innerHTML = `<h5>Features</h5>`;
    for(const list in featuresList){
        const li = document.createElement('li');
        li.innerText = featuresList[list].feature_name;
        featuresListDiv.appendChild(li);
    }

    // Single Data Integrations List
    const integrationsDiv = document.getElementById("single-data-integrations");
    integrationsDiv.innerHTML = `
    <h5>Integrations</h5>
    <ul>
      <li>${singleData.integrations[0]? singleData.integrations[0] : "Not available feature" }</li>
      <li>${singleData.integrations[1]? singleData.integrations[1] : "Not available feature" }</li>
      <li>${singleData.integrations[2]? singleData.integrations[2] : "Not available feature" }</li>
    </ul>
    `;

    // Single date Pricing section
    document.getElementById('data-basic-plan').innerHTML = `
    <h5 class="text-primary">${singleData.pricing[0].plan}</h5>
     <p>${singleData.pricing[0].price = "0" ? "Free of cost" : ""}</p> 
    `;
    document.getElementById('data-pro-plan').innerHTML = `
    <h5 class="text-success">${singleData.pricing[1].plan}</h5>
     <p>${singleData.pricing[1].price = "No cost" ? "Free of cost": ""}</p> 
    `;
    document.getElementById('data-enterprise-plan').innerHTML = `
    <h5 class="text-danger">${singleData.pricing[2].plan}</h5>
     <p>${singleData.pricing[2].price}</p> 
    `;


    // single AI Data image
    document.getElementById('data-image').src = singleData.image_link[0];

    // Data accuracy button
    const accurancyBtn = document.getElementById('data-accuracy-btn');
    if(singleData.accuracy.score !== null){
        accurancyBtn.innerText = singleData.accuracy.score + " Accuracy";
    }else{
        accurancyBtn.classList.add('d-none');
    }

    // example-container section

    const exampleContainer = document.getElementById('example-container');
    exampleContainer.innerHTML = `
        <h5>${singleData.input_output_examples[0].input}</h5>
        <p>${singleData.input_output_examples[0].output}</p>
    `;
}

loadAIData();