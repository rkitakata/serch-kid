// const fetchData = async (serchTerm) => {
//     const response = await axios.get('http://www.omdbapi.com/', {
//         params:{
//             apikey:'108fffaa',
//             // s:'avengers'
//             s:serchTerm
//         }
//     });

//     if (response.data.Error){
//         return[];
//     }
    
//     return response.data.Search;
// };

const autoCompleteConfig = {
    renderOpetion(movie){
        const imgSrc = movie.Poster==='N/A' ? '': movie.Poster;
        return `<img src="${imgSrc}" />
        ${movie.Title}(${movie.Year})
        `;
    },
  
    inputValue(movie){
        return movie.Title;
    },
    async fetchData(searchTerm){
        const response = await axios.get('http://www.omdbapi.com/', {
            params:{
                apikey:'108fffaa',
                // s:'avengers'
                s:searchTerm
            }
        });
    
        if (response.data.Error){
            return[];
        }
        
        return response.data.Search;
    }
}



creatAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#left-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie, document.querySelector('#left-summary'),'left');
    },
    
});
creatAutoComplete({
    ...autoCompleteConfig,
    root: document.querySelector('#right-autocomplete'),
    onOptionSelect(movie){
        document.querySelector('.tutorial').classList.add('is-hidden')
        onMovieSelect(movie,document.querySelector('#right-summary'),'right');
    },
});

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryElement,side) =>{
    const response=await axios.get('http://www.omdbapi.com/', {
        params:{
            apikey:'108fffaa',
            // s:'avengers'
            i:movie.imdbID
        }
    });
    summaryElement.innerHTML = movieTemplet(response.data);

    if (side === 'left'){
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    if (leftMovie && rightMovie){
        runCompairson();
    }
};

const runCompairson = () =>{
    const leftSideStats = document.querySelectorAll('#left-summary .notification');
    const rightSideStats = document.querySelectorAll('#right-summary .notification');

    leftSideStats.forEach((leftStat,index)=>{
        const rightStat = rightSideStats[index];

        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);



        if(rightSideValue > leftSideValue){
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-grey-lighter');
        }else if(rightSideValue < leftSideValue){
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-dark');

        }
        // else{
        //     rightStat.classList.add('is-danger');
        //     leftStat.classList.add('is-danger');
            
        // }
        
        
        
    })
    
};



const movieTemplet = (movieDetail) =>{
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

    let count = 0;
    
    const awards = movieDetail.Awards.split(' ').reduce((prev, word)=>{
        const value = parseInt(word);
        if(isNaN(value)){
            return prev;
        }else{
            return prev + value;
        }
    },0);
    console.log(awards);


    return `
    <article class="media">
        <figure class="media-left">
            <p class="image">
            <img src="${movieDetail.Poster}" />
            </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h1>${movieDetail.Title}</h1>
            <h4>${movieDetail.Genre}</h4>
            <p>${movieDetail.Plot}</p>
          </div>
        </div>
    </article>
    <article data-value=${awards} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box offfice</p>
    </article>
    <article data-value=${metascore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMD Rating </p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMD votes</p>
    </article>
    `
};


// const root = document.querySelector('.autocomplete')
// root.innerHTML=`
//     <lable><b>Search For a Movie</b></lable>
//     <input class="input" />
//     <div class="dropdown">
//           <div class="dropdown-menu">
//             <div class="dropdown-content results"></div>
//           </div>
//     </div>
// `;


// const input = document.querySelector('input');
// const dropdown = document.querySelector('.dropdown');
// const resultsWrapper = document.querySelector('.results');

// const onInput = async event => {
//     movies = await fetchData(event.target.value);

//     if(!movies.length){
//         dropdown.classList.remove('is-active');
//         return;
//     }
// //reset the serch menu
//     resultsWrapper.innerHTML=''
    
//     dropdown.classList.add('is-active');


//     for (let movie of movies){
//         const option = document.createElement('a');
//         const imgSrc = movie.Poster==='N/A' ? '': movie.Poster;

//         option.classList.add('dropdown-item');

//         option.innerHTML = `
//         <img src="${imgSrc}" />
//         ${movie.Title}
//         `;
//         option.addEventListener('click',()=>{
//             dropdown.classList.remove('is-active');
//             input.value = movie.Title
//             onMovieSelect(movie)
//         });



//         resultsWrapper.appendChild(option);
//     }
// };



// input.addEventListener('input', debounce(onInput,800));
// // (event)=>{fetchData(event.target.value);});
// //close dropdown menu
// document.addEventListener('click', event =>{
//     if(!root.contains(event.target)){
//         dropdown.classList.remove('is-active')
//     }

// })



// let timeoutId;
// const onInput = event => {
//     if (timeoutId){
//         clearTimeout(timeoutId)
//     }
//     timeoutId = setTimeout(()=>{
//         fetchData(event.target.value);
//     },600);
// };

// const onMovieSelect = async movie =>{
//     const response=await axios.get('http://www.omdbapi.com/', {
//         params:{
//             apikey:'108fffaa',
//             // s:'avengers'
//             i:movie.imdbID
//         }
//     });

    // console.log(response.data);
//     document.querySelector('#summary').innerHTML = movieTemplet(response.data);
// };

// const movieTemplet = (movieDetail) =>{
//     return `
//     <article class="media">
//         <figure class="media-left">
//             <p class="image">
//             <img src="${movieDetail.Poster}" />
//             </p>
//         </figure>
//         <div class="media-content">
//           <div class="content">
//             <h1>${movieDetail.Title}</h1>
//             <h4>${movieDetail.Genre}</h4>
//             <p>${movieDetail.Plot}</p>
//           </div>
//         </div>
//     </article>
//     <article class="notification is-primary">
//       <p class="title">${movieDetail.Awards}</p>
//       <p class="subtitle">Awards</p>
//     </article>
//     <article class="notification is-primary">
//       <p class="title">${movieDetail.BoxOffice}</p>
//       <p class="subtitle">Box offfice</p>
//     </article>
//     <article class="notification is-primary">
//       <p class="title">${movieDetail.Metascore}</p>
//       <p class="subtitle">Metascore</p>
//     </article>
//     <article class="notification is-primary">
//       <p class="title">${movieDetail.imdbRating}</p>
//       <p class="subtitle">IMD Rating </p>
//     </article>
//     <article class="notification is-primary">
//       <p class="title">${movieDetail.imdvVotes}</p>
//       <p class="subtitle">IMD votes</p>
//     </article>
//     `
// };



