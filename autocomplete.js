const creatAutoComplete = ({
    root, 
    renderOpetion, 
    onOptionSelect,
    inputValue,
    fetchData
}) =>{
    // const root = document.querySelector('.autocomplete')
    root.innerHTML=`
        <lable><b>Search For a Movie</b></lable>
        <input class="input" />
        <div class="dropdown">
             <div class="dropdown-menu">
             <div class="dropdown-content results"></div>
        </div>
        </div>
`;


const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');
// const input = document.querySelector('input');
// const dropdown = document.querySelector('.dropdown');
// const resultsWrapper = document.querySelector('.results');

const onInput = async event => {
    items = await fetchData(event.target.value);

    if(!items.length){
        dropdown.classList.remove('is-active');
        return;
    }
//reset the serch menu
    resultsWrapper.innerHTML='';
    dropdown.classList.add('is-active');


    for (let item of items){
        const option = document.createElement('a');
        // const imgSrc = movie.Poster==='N/A' ? '': movie.Poster;

        option.classList.add('dropdown-item');

        option.innerHTML=renderOpetion(item);
        // `
        // <img src="${imgSrc}" />
        // ${movie.Title}
        // `;
        option.addEventListener('click',()=>{
            dropdown.classList.remove('is-active');
            input.value = inputValue(item);
            onOptionSelect(item)
        });



        resultsWrapper.appendChild(option);
    }
};


    input.addEventListener('input', debounce(onInput,800));
    // (event)=>{fetchData(event.target.value);});
    //close dropdown menu
    document.addEventListener('click', event =>{
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-active')
        }

    })
};