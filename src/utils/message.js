import swal from 'sweetalert';

export const sendMessage = (params) => {
    let data = [];

    switch (params) {
        case 200:
            data = {
                icon: 'success',
                title: 'Berhasil!',
                text: 'Data uploaded to the server. Fire on!'
            };
            break;
        case 404:
            data = {
                icon: 'info',
                title: 'Ada kendala teknis',
                text: 'silahkan tunggu dan coba beberapa saat lagi'
            };
            break;
        case 408:
            data = {
                icon: 'info',
                title: 'Data sudah ada',
                text: 'silahkan cek kembali data anda'
            };
            break;
        case 500:
            data = {
                icon: 'error',
                title: 'Gagal',
                text: 'silahkan tunggu dan coba beberapa saat lagi'
            };
            break;
        default:
            return null;
    }

    return swal({
        ...data,
        buttons: false,
        timer: 3000
    });
};