import xml.dom.minidom

domtree = xml.dom.minidom.parse("MRB-01-RuaDoCampo.xml")

rua = domtree.documentElement

meta = rua.getElementsByTagName("meta")

corpo = rua.getElementsByTagName("corpo")

figuras = corpo.getElementsByTagName("figura")

paras = corpo.getElementsByTagName("para")

listas_casas = corpo.getElementsByTagName("lista-casa")

casas = listas_casas.getElementsByTagName("casa")

for casa in casas:
    numero = casa.getElementsByTagName("número")[0].childNodes[0].nodeValue
    enfiteuta = casa.getElementsByTagName("enfiteuta")[0].childNodes[0].nodeValue
    foro = casa.getElementsByTagName("foro")[0].childNodes[0].nodeValue
    desc = casa.getElementsByTagName("desc")[0].childNodes[0].nodeValue

    print(f"Numero: {numero}")
    print(f"Enfiteuta: {enfiteuta}")
    print(f"Foro: {foro}")
    print(f"Desc: {desc}")

