var array=[]

const crear= (usuario)=>{
    array.push(usuario)
}

const buscarUsername= (username)=>{

    const usuario= array.find(usuario=>usuario.username==username)

    return usuario ? usuario : null

}

const buscarEmail= (email)=>{

    const usuario= array.find(usuario=>usuario.email==email)

    return usuario ? usuario : null
    
}

export default {crear, buscarEmail, buscarUsername}
