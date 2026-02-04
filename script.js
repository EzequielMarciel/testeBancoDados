import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

// suas credenciais do Supabase (copie de Project Settings → API)
const supabaseUrl = "https://rzmomstdheorrqwkdfek.supabase.co"
const supabaseKey = "sb_publishable_p9mvf-w3oreBk5KvAMKfvg_tpScOIzu"
const supabase = createClient(supabaseUrl, supabaseKey)

const form = document.getElementById("cadastroForm")
const perfilDiv = document.getElementById("perfil")

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  const nome = document.getElementById("nome").value.trim()
  const email = document.getElementById("email").value.trim()
  const foto = document.getElementById("foto").value.trim()

  if (!nome || !email) {
    perfilDiv.innerHTML = `<p style="color:red">Nome e Email são obrigatórios!</p>`
    return
  }

  const { data, error } = await supabase
    .from("usuarios")
    .insert([{ nome, email, foto_url: foto }])
    .select()

  if (error) {
    console.error("Erro ao inserir:", error)
    perfilDiv.innerHTML = `<p style="color:red">Erro: ${error.message}</p>`
    return
  }

  const usuario = data[0]
  // salva o ID no navegador
  localStorage.setItem("usuarioId", usuario.id)

  perfilDiv.innerHTML = `
    <h2>Usuário cadastrado</h2>
    <p><strong>ID:</strong> ${usuario.id}</p>
    <p><strong>Nome:</strong> ${usuario.nome}</p>
    <p><strong>Email:</strong> ${usuario.email}</p>
    ${usuario.foto_url ? `<img src="${usuario.foto_url}" alt="Foto">` : ""}
  `
})
