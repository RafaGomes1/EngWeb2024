import csv
import json

def read_file(file_path):
    bd = []
    try:
        with open(file_path,"r") as file:
            for row in file:
                filme = json.loads(row)

                if "genres" not in filme or "cast" not in filme:
                    continue

                else:
                    if len(filme["cast"]) == 0 or len(filme["genres"]) == 0:
                        continue
                    else:
                        if "_id" in filme:
                            filme['id'] = filme['_id']['$oid']
                            del filme["_id"]
                            bd.append(filme)
    
    except FileNotFoundError:
        print(f"The file {file_path} could not be found")
    except Exception as e:
        print(f"An error ocurred: {e}")

    return bd


def pertenceAtor(valor, bd):
    encontrado = False
    i = 0
    while i < len(bd) and not encontrado:
        if "ator" in bd[i] and bd[i]["ator"] == valor:
            encontrado = True
        i+=1

    return encontrado


def pertenceGenero(valor, bd):
    encontrado = False
    i = 0
    while i < len(bd) and not encontrado:
        if "genero" in bd[i] and bd[i]["genero"] == valor:
            encontrado = True
        i+=1

    return encontrado


def calc_atores(bd):
    contador = 1
    atores = []

    for reg in bd:
        try:
            lista = reg["cast"]
            for act in lista:
                if not pertenceAtor(act, atores):
                    filmes = ator_filmes(act,bd)
                    atores.append({
                        "id" : f"a{contador}",
                        "ator" : f"{act}",
                        "filmes" : filmes
                    })
                    contador += 1
        except KeyError:
            print("ERRO CALC_ATORES")
    return atores


def calc_genres(bd):
    contador = 1
    genres = []

    for reg in bd:
        try:
            lista = reg["genres"]
            for gen in lista:
                if not pertenceGenero(gen, genres):
                    filmes = genero_filmes(gen,bd)
                    genres.append({
                        "id" : f"g{contador}",
                        "genero" :  f"{gen}",
                        "filmes" : filmes
                    })

                    contador += 1
        except KeyError:
            print("ERRO CALC_GENRES")
    return genres


def ator_filmes(ator,bd):
    result = []

    for reg in bd:
        try:
            lista = reg["cast"]
            for a in lista:
                if a == ator:
                    result.append({
                        "id" : reg["id"],
                        "nome" : reg["title"]
                    })
                    break
        except KeyError:
            print("ERRO ATOR_FILMES")
    return result


def genero_filmes(genereo,bd):
    result = []

    for reg in bd:
        try:
            lista = reg["genres"]
            for a in lista:
                if a == genereo:
                    result.append({
                        "id" : reg["id"],
                        "nome" : reg["title"]
                    })
                    break
        except KeyError:
            print("ERRO GENERO_FILMES")
    return result


file_path = "filmes.json"
bd = read_file(file_path)
atores = calc_atores(bd)
generos = calc_genres(bd)
novaBD = {
    "filmes": bd,
    "atores": atores,
    "generos": generos
}

f = open("dataset.json", "w")
json.dump(novaBD, f, indent=4)
f.close()