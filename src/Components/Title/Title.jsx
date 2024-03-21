import React from 'react';

const Title = ({title}) => {
    return (
        <div className='flex items-center my-4 justify-center'>

        <h1 class="text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
       {title}
    </h1>
        </div>
    );
};

export default Title;