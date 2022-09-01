let heroes = [
  {
      name: 'Nekomata catian',
      type: 'Cat-Sith',
      damage: 35,
      health: 10,
      maxHealth: 10,
      img: "😺",
      hitPercent: 0.75
  },
  {
      name: 'Flint Ironstag',
      type: 'Elf',
      damage: 15,
      health: 50,
      maxHealth: 50,
      img: "🧝",
      hitPercent: 0.4
  },{
    name: 'Naofumi Iwatani',
      type: 'Shield Hero',
      damage: 5,
      health: 100,
      maxHealth: 100,
      img: "🛡️",
      hitPercent: 1
  }
]

let boss = {
  health: 1000,
  maxHealth: 1000,
  damage: 5,
  level: 1,
  hitPercent: .35
}

let statusMessage = "";
let startGame = false;
let playerDead1 = false;
let playerDead2 = false;
let playerDead3 = false;

function removeHealthClass() {
  let healthElement = document.getElementById("health")?.classList
  if (healthElement?.contains("health-100")) {
    healthElement.remove("health-100")
  } else if (healthElement?.contains("health-90")) {
    healthElement.remove("health-90")
  } else if (healthElement?.contains("health-80")) {
    healthElement.remove("health-80")
  } else if (healthElement?.contains("health-70")) {
    healthElement.remove("health-70")
  } else if (healthElement?.contains("health-60")) {
    healthElement.remove("health-60")
  } else if (healthElement?.contains("health-50")) {
    healthElement.remove("health-50")
  } else if (healthElement?.contains("health-40")) {
    healthElement.remove("health-40")
  } else if (healthElement?.contains("health-30")) {
    healthElement.remove("health-30")
  } else if (healthElement?.contains("health-20")) {
    healthElement.remove("health-20")
  } else if (healthElement?.contains("health-10")) {
    healthElement.remove("health-10")
  } else if (healthElement?.contains("health-0")) {
    healthElement.remove("health-0")
  }
}

function updateBossHealthBar() {
  let healthBarElement = document.getElementById("health")?.classList
  let bossHealthPercent = (boss.health / boss.maxHealth)*100;
  removeHealthClass()
  if (bossHealthPercent <= 100 && bossHealthPercent > 90) {
    healthBarElement?.add("health-100")
  } else if (bossHealthPercent <= 90 && bossHealthPercent > 80) {
    healthBarElement?.add("health-90")
  } else if (bossHealthPercent <= 80 && bossHealthPercent > 70) {
    healthBarElement?.add("health-80")
  } else if (bossHealthPercent <= 70 && bossHealthPercent > 60) {
    healthBarElement?.add("health-70")
  } else if (bossHealthPercent <= 60 && bossHealthPercent > 50) {
    healthBarElement?.add("health-60")
  } else if (bossHealthPercent <= 50 && bossHealthPercent > 40) {
    healthBarElement?.add("health-50")
  } else if (bossHealthPercent <= 40 && bossHealthPercent > 30) {
    healthBarElement?.add("health-40")
  } else if (bossHealthPercent <= 30 && bossHealthPercent > 20) {
    healthBarElement?.add("health-30")
  } else if (bossHealthPercent <= 20 && bossHealthPercent > 10) {
    healthBarElement?.add("health-20")
  } else if (bossHealthPercent <= 10 && bossHealthPercent > 0) {
    healthBarElement?.add("health-10")
  } else if (bossHealthPercent == 0) {
    healthBarElement?.add("health-0")
  }
  console.log(healthBarElement)
}

function drawBattle() {
  let bossElement = document.getElementById("boss");
  let bossTemplate = `
  <img onclick="attackBoss()" src="IMG_2237.PNG" alt="boss" class="img-height img-fluid">
  <div class="d-flex justify-content-between">
    <h4 class="me-5">Health: ${boss.health}</h4>
    <h4 class="ms-5">Level: ${boss.level}</h4>
  </div>
  `
  if (bossElement && bossTemplate != ``) {
    bossElement.innerHTML = bossTemplate
  }
  let playersElement = document.getElementById("players");
  let playersTemplate = ""
  for (let i = 0; i < heroes.length; i++) {
    playersTemplate += `
    <div class="col-2 d-flex flex-column align-items-center mx-5 my-3 border border-3 border-dark">
      <h1 class="img-text">${heroes[i].img}</h1>
      <h4>${heroes[i].name}</h4>
      <h4>Health: <span class="text-success">${heroes[i].health}</span></h4>
      <h4>Attack Power: <span class="text-danger">${heroes[i].damage}</span></h4>
      <h4>Race: <span class="text-primary">${heroes[i].type}</span></h4>
    </div>
    `
  }
  if (playersElement && playersTemplate != ``) {
    playersElement.innerHTML = playersTemplate
  }
}

function attackBoss () {
  if (startGame) {
    let hero1hit = false;
    let hero2hit = false;
    let hero3hit = false;
    if (Math.random() <= (heroes[0].hitPercent)) {
      boss.health -= heroes[0].damage;
      hero1hit = true;
    } if (Math.random() <= (heroes[1].hitPercent)) {
      boss.health -= heroes[1].damage;
      hero2hit = true;
    } if (Math.random() <= (heroes[2].hitPercent)) {
      boss.health -= heroes[2].damage;
      hero3hit = true;
    }
    if (hero1hit) {
      if (hero2hit) {
        if (hero3hit) {
          statusMessage = "All heroes hit the boss!"
        } else if (!hero3hit) {
          statusMessage = "Only " + heroes[0].name + " and " + heroes[1].name + " hit the boss!"
        }
      } else if (!hero2hit) {
        if (hero3hit) {
          statusMessage = "Only " + heroes[0].name + " and " + heroes[3].name + " hit the boss!"
        } else if (!hero3hit) {
          statusMessage = "Only " + heroes[0].name + " hit the boss!"
        }
      }
    } else if (!hero1hit) {
      if (hero2hit) {
        if (hero3hit) {
          statusMessage = "Only " + heroes[1].name + " and " + heroes[2].name + " hit the boss!"
        } else if (!hero3hit) {
          statusMessage = "Only " + heroes[1].name + " hit the boss!"
        }
      } else if (!hero2hit) {
        if (hero3hit) {
          statusMessage = "Only " + heroes[2].name + " hit the boss!"
        } else if (!hero3hit) {
          statusMessage = "None of the heroes could hit the boss!"
        }
      }
    }
    if (boss.health <= 0) {
      boss.health = 0;
      bossDefeat()
    }
    drawBattle()
    drawStatusBlank()
    updateBossHealthBar()
  }
}

function drawStatusBlank() {
  let statusElement = document.getElementById("status");
  let statusTemplate = `
  <h4>...</h4>
  `
  if (statusElement && statusTemplate != ``) {
    statusElement.innerHTML = statusTemplate
  }
  setTimeout(drawStatus, 250)
}

function drawStatus() {
  let statusElement = document.getElementById("status");
  let statusTemplate = `
  <h4>${statusMessage}</h4>
  `
  if (statusElement && statusTemplate != ``) {
    statusElement.innerHTML = statusTemplate
  }
}

function bossDefeat() {
  statusMessage = "The boss was defeated... but it's not done yet"
  // reset boss and upgrade
  boss.maxHealth *= 1.5
  boss.health = boss.maxHealth
  boss.level += 1
  boss.damage *= 1.25
  boss.hitPercent *= 1.5
  // boss make sure JS not dumb
  boss.maxHealth = (Math.round(boss.maxHealth*100))/100
  boss.health = (Math.round(boss.health*100))/100
  boss.damage = (Math.round(boss.damage*100))/100
  boss.hitPercent = (Math.round(boss.hitPercent*100))/100
  // heal and upgrade heroes
  for (let i = 0; i < heroes.length; i++) {
    heroes[i].maxHealth *= (Math.round((1+Math.random())*100))/100
    heroes[i].health = heroes[i].maxHealth
    heroes[i].damage *= (Math.round((1+Math.random())*100))/100
    heroes[i].hitPercent *= (Math.round((1+Math.random())*100))/100
  }
  drawStatusBlank()
  drawBattle()
  updateBossHealthBar()
}

function attackPlayers() {
  if (startGame) {
    let bossHit1 = false;
    let bossHit2 = false;
    let bossHit3 = false;
    let bossHit = Math.random()
    for (let index = 0; index < heroes.length; index++) {
      if (bossHit <= boss.hitPercent && heroes[index].health > boss.damage) {
        heroes[index].health -= boss.damage
        if (index == 0) {
          bossHit1 = true;
        } else if (index == 1) {
          bossHit2 = true
        } else if (index == 2) {
          bossHit3 = true;
        }
      } else if (bossHit <= boss.hitPercent && heroes[index].health <= boss.damage && heroes[index].health > 0) {
        heroes[index].health = 0
        if (index == 0) {
          bossHit1 = true;
        } else if (index == 1) {
          bossHit2 = true
        } else if (index == 2) {
          bossHit3 = true;
        }
      } else if (bossHit <= boss.hitPercent && heroes[index].health == 0) {
        if (index == 0) {
          playerDead1 = true
        } else if (index == 1) {
          playerDead2 = true
        } else if (index == 2) {
          playerDead3 = true
        }
      }
    }
    if (bossHit1) {
      if (bossHit2) {
        if (bossHit3) {
          statusMessage = "The boss was able to hit all 3 heroes"
        } else if (!bossHit3) {
          statusMessage = "The boss was able to hit " + heroes[0].name + " and " + heroes[1].name + "!"
        }
      } else if (!bossHit2) {
        if (bossHit3) {
          statusMessage = "The boss was able to hit " + heroes[0].name + " and " + heroes[2].name + "!"
        } else if (!bossHit3) {
          statusMessage = "The boss was able to hit " + heroes[0].name + "!"
        }
      }
    } else if (!bossHit1) {
      if (bossHit2) {
        if (bossHit3) {
          statusMessage = "The boss was able to hit " + heroes[1].name + " and " + heroes[2].name + "!"
        } else if (!bossHit3) {
          statusMessage = "The boss was able to hit " + heroes[1].name + "!"
        }
      } else if (!bossHit2) {
        if (bossHit3) {
          statusMessage = "The boss was able to hit " + heroes[2].name + "!"
        } else if (!bossHit3) {
          statusMessage = "The boss wasn't able to hit any heroes!"
        }
      }
    } if (playerDead1) {
      statusMessage = "The boss killed " + heroes[0].name + "!"
    }

    drawStatusBlank()
    drawBattle()
  }
}

function gameStart() {
  if (!startGame) {
    startGame = true;
  }
  statusMessage = "Game Start!"
  drawStatusBlank()
}

setInterval(attackPlayers, 15000)

drawBattle()
updateBossHealthBar()
drawStatus()