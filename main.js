// fetch api

const loadAIData = () =>{
    fetch("https://openapi.programming-hero.com/api/ai/tools")
    .then(res => res.json())
    .then(data => displayAIData(data.data.tools));
}

// display AI function
const displayAIData = AIDatas =>{
    // console.log(AIDatas);
    const AIDataContainer = document.getElementById('AI-data-container');
    AIDatas.forEach(AIData =>{
        console.log(AIData);
        const AIDataDiv = document.createElement('div');
        AIDataDiv.classList.add('col');

        AIDataDiv.innerHTML = `
        <div class="card h-100 p-3">
                <img src="${AIData.image}" class="card-img-top " alt="..." />
                <div class="card-body">
                    
                    <h5 class="card-title">${AIData.name}</h5>
                    <p class="card-text">
                    This is a longer card with supporting text below as a
                    natural lead-in to additional content. This content is a
                    little bit longer.
                    </p>
                </div>
              </div>
        
        `;
        AIDataContainer.appendChild(AIDataDiv);
    })
}



loadAIData();