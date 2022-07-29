import Swal from 'sweetalert2';

async function confirmUserAction(questionText = 'Sure to proceed?'){
    const result = await Swal.fire({
        title: questionText,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#e41e26'
    });

    return Boolean(result.value);
}


export { confirmUserAction }