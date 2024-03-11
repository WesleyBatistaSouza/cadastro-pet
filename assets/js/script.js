const form = document.getElementById("cadastroPet");
const petList = document.getElementById("petList");
const saveBtn = document.getElementById("salvarDados");
const clearList = document.getElementById("limparLista");


class Pets {
    constructor(nome, especie, idade, sexo, raca) {
        this.nome = nome;
        this.especie = especie;
        this.idade = idade;
        this.sexo = sexo;
        this.raca = raca;
    }
}

const pets = JSON.parse(localStorage.getItem('pets')) || [];

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = form.nome.value;
    const especie = form.especie.value;
    const idade = form.idade.value;
    const sexo = form.sexo.value;
    const raca = form.raca.value;

    const animal = new Pets(nome, especie, idade, sexo, raca);
    pets.push(animal);

    exibirPet();
    salvarPet();
    form.reset();
});

function exibirPet() {
    petList.innerHTML = '';

     pets.forEach((pet, index) => {
        const petsList = document.createElement('section');
        petsList.innerHTML = `<li class="infoPet">nome:
        ${pet.nome}</li>
                        <li>raça: <br>
                        ${pet.especie}</li>
                        <li>Idade: <br>
                        ${pet.idade}</li> 
                        <li>Sexo:<br>
                        ${pet.sexo}</li><br>
                        <li>Raça:<br>
                        ${pet.raca}</li>
                        <div class="btn">
                            <button class="editBtn" data-index="${index}">Editar</button>
                            <button class="removeBtn" data-index="${index}">Excluir</button>
                        </div>`;
        petList.appendChild(petsList);
    });
}

petList.addEventListener('click', (event) => {
    if(event.target.classList.contains('removeBtn')) {
        const index = event.target.dataset.index;
        pets.splice(index, 1);

        exibirPet();
        salvarPet();
    } else if(event.target.classList.contains('editBtn')) {
        const index = event.target.dataset.index;
        const pet = pets[index];

        const petName = prompt("Qual o nome do seu pet:", pet.nome);
        const petEspecie = prompt("Qual a especie do seu pet:", pet.especie);        
        const petIdade = prompt("Digite a idade do seu pet", pet.idade);
        const petSexo = prompt("Digite o sexo do pet", pet.sexo);
        const petRaca = prompt("Digite o sexo do pet", pet.raca);
        if(petName !== null) {
            pet.nome = petName;
            pet.especie = petEspecie;
            pet.idade = petIdade;
            pet.sexo = petSexo;
            pet.raca = petRaca;

            exibirPet();
            salvarPet();
        }
    }
});

saveBtn.addEventListener('click', () => {
    pets = [];
    salvarPet();
});

function salvarPet() {
    localStorage.setItem('pets', JSON.stringify(pets));
}

window.addEventListener('load', function() {
    exibirPet();
});
