import os
import xml.etree.ElementTree as ET

if not os.path.exists("html"):
    os.makedirs("html")

html = """
<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <title>Ruas de Braga</title>
    <meta charset="utf-8">
</head>
<body>
"""

template = """<!DOCTYPE html>
<html lang="pt-PT">
<head>
    <title>Ruas de Braga</title>
    <meta charset="utf-8">
</head>
<body>
"""

path_ruas = "./MapaRuas/texto/"

for file in os.listdir(path_ruas):
    file_path = os.path.join(path_ruas, file)

    tree = ET.parse(file_path)
    root = tree.getroot()

    # Nome da Rua
    rua_nome = root.find("./meta/nome").text

    # Figuras
    imagens = {}

    for figura in root.findall(".//figura"):
        imagem = figura.find("imagem")
        img_path = "../MapaRuas/imagem/" + os.path.basename(imagem.get("path"))
        legenda = figura.find("legenda").text
        imagens[img_path] = legenda
    
    
    vistas_atuais_path = "./MapaRuas/atual/"
        
    for img in os.listdir(vistas_atuais_path):
        if rua_nome.replace(" ","") in img:
            img_path = "./MapaRuas/atual/" + img
            if "Vista1" in img_path:
                legenda = f"{rua_nome} - Vista 1"
            if "Vista2" in img_path:
                legenda = f"{rua_nome} - Vista 2"

            imagens["." + img_path] = legenda
            
    paragrafos = ""
    for paragrafo in root.findall("./corpo/para"):
        texto = paragrafo.text.strip() if paragrafo.text else ""
        paragrafos += texto
        for p in paragrafo:
            if p.tag == "lugar":
                lugar = p.text.strip() if p.text else ""
                texto += f" {lugar} "
                if p.tail:
                    texto += p.tail.strip()

            elif p.tag == "data":
                data = p.text.strip() if p.text else ""
                texto += f" {data} "
                if p.tail:
                    texto += p.tail.strip()

            elif p.tag == "entidade" and p.get("tipo") == "instituição":
                entidade = p.text.strip() if p.text else ""
                texto += f" {entidade}"
                if p.tail:
                    texto += p.tail.strip()

            else:
                texto += f" {p.text.strip()}"
                if p.tail:
                    texto += p.tail.strip()
        
        paragrafos += texto
    
    casas = []
    for casa in root.findall(".//casa"):
        info = []
        numero = casa.find("número").text if casa.find("número") is not None else "Não possui número"
        enfiteuta = casa.find("enfiteuta").text if casa.find("enfiteuta") is not None else "Não possui enfiteuta"
        foro = casa.find("foro").text if casa.find("foro") is not None else "Não possui foro"

        descricao = ""

        desc_element = casa.find("desc")
        if desc_element is not None:
            for desc in desc_element:
                texto = desc.text.strip() if desc.text else ""

                for d in desc:
                    if d.tag == "lugar":
                        lugar = d.text.strip() if d.text else ""
                        texto += f" {lugar} "
                        if d.tail:
                            texto += d.tail.strip()

                    elif d.tag == "data":
                        data = d.text.strip() if d.text else ""
                        texto += f" {data} "
                        if d.tail:
                            texto += d.tail.strip()

                    elif d.tag == "entidade" and d.get("tipo") == "instituição":
                        entidade = d.text.strip() if d.text else ""
                        texto += f" {entidade}"
                        if d.tail:
                            texto += d.tail.strip()

                    else:
                        texto += f" {d.text.strip()}"
                        if d.tail:
                            texto += d.tail.strip()

                descricao += texto

        info.append(numero)
        info.append(enfiteuta)
        info.append(foro)
        info.append(descricao)
        casas.append(info)


    html += f"<li><a href='html/{rua_nome}.html'>{rua_nome}</a></li>"
    pagina_rua = template
    pagina_rua += f"<h1>{rua_nome}</h1>"
    pagina_rua += "<div class='imagens-container'>"
    for img, leg in imagens.items():
        pagina_rua += "<div class='imagem-container'>"
        pagina_rua += f"<img src='{img}' width='50%' height='auto'>"
        pagina_rua += f"<p>{leg}</p>"
        pagina_rua += "</div>"
    pagina_rua += "</div>"
    pagina_rua += "<h2>Descrição da Rua</h2>"
    pagina_rua += f"<p class='rua-paragrafo'>{paragrafos}</p>"
    pagina_rua += "<h2>Casas</h2>"

    for casa in casas:
        pagina_rua += f"<dt> <b>Número:</b> {casa[0]}"
        pagina_rua += f"<dd>- <b>Enfiteuta:</b> {casa[1]}</dd>"
        pagina_rua += f"<dd>- <b>Foro:</b> {casa[2]}</dd>"
        pagina_rua += f"<dd>- <b>Descrição:</b> {casa[3]}</dd>"

    pagina_rua += "</body>"
    pagina_rua += "<h3><a href='../Ruas de Braga.html'>Voltar</a></h3>"
    pagina_rua += "</html>"
    caminho = f"{'html'}/{rua_nome}.html"
    if os.path.exists(caminho):
        os.remove(caminho)
    file = open(caminho, "w", encoding="utf-8")
    file.write(pagina_rua)
    file.close()

ficheiroHtml = open("Ruas de Braga.html", "w", encoding="utf-8")
ficheiroHtml.write(html)
ficheiroHtml.close()




    




