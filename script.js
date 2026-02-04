import { createClient } from "sb_publishable_p9mvf-w3oreBk5KvAMKfvg_tpScOIzu"

// coloque aqui suas credenciais
const supabaseUrl = "https://rzmomstdheorrqwkdfek.supabase.co"
const supabaseKey = "https://sb_publishable_p9mvf-w3oreBk5KvAMKfvg_tpScOIzu"
const supabase = createClient(supabaseUrl, supabaseKey)

const form = document.getElementById("cadastroForm")
const perfilDiv = document.getElementById("perfil")

form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const nome = document.getElementById("nome").value
  const email = document.getElementById("email").value
  const fotoUrl = document.getElementById("foto").value

  const { data, error } = await supabase
    .from("usuarios")
    .insert([{ nome, email, foto_url: fotoUrl }])
    .select()

  if (error) {
    perfilDiv.innerHTML = `<p style="color:red">Erro: ${error.message}</p>`
    return
  }

  const usuario = data[0]
  perfilDiv.innerHTML = `
    <h2>${usuario.nome}</h2>
    <p>Número de cadastro: ${usuario.id}</p>
    ${usuario.foto_url ? `<img src="${usuario.foto_url}" alt="Foto">` : ""}
  `
})







