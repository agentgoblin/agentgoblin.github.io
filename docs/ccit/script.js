let events=[["Бандит","Бродяга","Грабитель","Дерущиеся","Животное","Житель","Жулик","Карманник","Кошка","Патруль","Извозчик","Попрошайка","Проститутка","Птица","Пьяница","Сектант","Собака","Торгаш","Уличный артист","Хулиган"],["Агрессивный","Без памяти","Без сознания","Больной","Глухой","Дурачок","Заика","Испуганный","Калека","Лжец","Мертвый","Немой","Побитый","Пьяный","Раненый","Ребенок","Озлобленный","С просьбой","Слепой","Убегающий"],["Глазок","Картина","Ловушка","Надпись","Открытая дверь","Открытое окно","Рисунок","Скрытая кнопка","Скрытый рычаг","Скрытый люк","Скрытый проход","Следы вещества","Следы грязи","Следы взлома","Следы крови","Следы починки","Следы предмета","Следы существа","Следы удара","Тайник"],["Деньги","Ёмкость с чем-то","Записка","Игрушка","Ключ","Кольцо","Кулон","Лоскут одежды","Обломок чего-то","Одежда, обувь","Орудие разбоя","Орудие труда","Отходы","Печатка","Письмо","Платок","Серьга","Талисман бога","Фекалии","Шкатулка"]],rollDice=e=>Math.floor(Math.random()*e),rollCellIndex=()=>[rollDice(events.length),rollDice(events[0].length)];function writeLog(e){var t=document.getElementById("log"),l=document.createElement("p");for(l.appendChild(document.createTextNode(e)),t.insertBefore(l,t.firstChild);20<t.children.length;)t.removeChild(t.lastChild)}function getEventText(e,t){return events[e][t]}function generate(){pair1=rollCellIndex(),pair2=rollCellIndex(),drawTable(...pair1,...pair2),pair1[0]==pair2[0]&&pair1[1]==pair2[1]?writeLog(getEventText(...pair1)):writeLog(getEventText(...pair1)+" "+getEventText(...pair2))}function drawTable(n,r,a,d){for(var e=document.getElementById("table");0<e.children.length;)e.removeChild(e.lastChild);if(document.getElementById("showTable").checked){var t=document.createElement("table");for(let l=0;l<events[0].length;l++){var o=document.createElement("tr");for(let t=0;t<events.length;t++){var i=document.createElement("td");i.appendChild(document.createTextNode(events[t][l]));let e=0;l==r&&t==n&&(e+=1),l==d&&t==a&&(e+=1),1==e&&i.classList.add("oneshot"),2==e&&i.classList.add("twoshot"),o.appendChild(i)}t.appendChild(o)}e.appendChild(t)}}function cleanup(){for(var e=document.getElementById("log");0<e.children.length;)e.removeChild(e.lastChild);drawTable()}