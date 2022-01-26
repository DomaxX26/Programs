#Menu para elegir varios trabajos




def mostrarMenu():
    menu = {}

    menu['0'] = "[1] ¿Que numero es mayor?"
    menu['1'] = "[2] ¿Que numero es menor?"
    menu['2'] = "[3] Hacer la media de unos valores"
    menu['3'] = "[4] Salir del programa"

    #Recorremos el array del menú para mostrarlo y poder hacer las funcionalidades
    for opcion in menu:
        print(menu[opcion]);



def numeroMayor():
        numVeces = int(input("Cuantos numeros quieres introducir: "))
        numeros = []
        for x in range(numVeces):
                parseo = str(x+1)
                num = int(input(" " + parseo+ ". Numero a introducir: ")) 
                numeros.append(num)
        
        numeros.sort()
        lastNumber = numeros[len(numeros) - 1]
        lastNumberString = str(lastNumber)
        print("Este és el major número introduït: " + lastNumberString)
                
        
#def numeroMenor():

#def numeroMedia():





while True:
        mostrarMenu()
        indice = int(input("Introduce un número del (1-4): "))
        
        if indice == 1:
                numeroMayor()
        #elif indice == 2:
                #numeroMenor()
        #elif indice == 3:
                #numeroMedia()
        elif indice == 4:
                exit()
