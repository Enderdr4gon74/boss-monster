let heroes = [
  {
      name: 'Nekomata catian',
      type: 'Cat-Sith',
      damage: 60,
      health: 30,
      maxHealth: 30,
      img: "😺",
      hitPercent: 0.75
  },
  {
      name: 'Flint Ironstag',
      type: 'Elf',
      damage: 35,
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
  damage: 15,
  level: 1,
  hitPercent: .50,
  reward: 10
}

let statusMessageBoss = "...Loading...";
let statusMessageHeroes = "...Loading...";
let statusMessageDefeat = "...Loading...";
let startGame = false;
let reward = 0;

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
  <h4 class="me-5">Health: ${boss.health}</h4>
  <h4 class="ms-5">Level: ${boss.level}</h4>
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
      <h4>Health: <span class="text-success">${heroes[i].health}/${heroes[i].maxHealth}</span></h4>
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
    console.log("boss attacked")
    let condition1 = false;
    let condition2 = false;
    let condition3 = false;
    if (heroes[0].health > 0) {
      condition1 = true
    }
    if (heroes[1].health > 0) {
      condition2 = true
    }
    if (heroes[2].health) {
      condition3 = true
    }
    let hero1hit = false;
    let hero2hit = false;
    let hero3hit = false;
    if (condition1) {
      if (Math.random() <= (heroes[0].hitPercent)) {
        boss.health -= heroes[0].damage;
        hero1hit = true;
      }
    }
    if (condition2) {
      if (Math.random() <= (heroes[1].hitPercent)) {
        boss.health -= heroes[1].damage;
        hero2hit = true;
      }
    }
    if (condition3) {
        if (Math.random() <= (heroes[2].hitPercent)) {
        boss.health -= heroes[2].damage;
        hero3hit = true;
      }
    }
    if (hero1hit) {
      if (hero2hit) {
        if (hero3hit) {
          statusMessageBoss += "All heroes hit the boss! "
        } else if (!hero3hit) {
          statusMessageBoss += "Only " + heroes[0].name + " and " + heroes[1].name + " hit the boss! "
        }
      } else if (!hero2hit) {
        if (hero3hit) {
          statusMessageBoss += "Only " + heroes[0].name + " and " + heroes[3].name + " hit the boss! "
        } else if (!hero3hit) {
          statusMessageBoss += "Only " + heroes[0].name + " hit the boss! "
        }
      }
    } else if (!hero1hit) {
      if (hero2hit) {
        if (hero3hit) {
          statusMessageBoss += "Only " + heroes[1].name + " and " + heroes[2].name + " hit the boss! "
        } else if (!hero3hit) {
          statusMessageBoss += "Only " + heroes[1].name + " hit the boss! "
        }
      } else if (!hero2hit) {
        if (hero3hit) {
          statusMessageBoss += "Only " + heroes[2].name + " hit the boss! "
        } else if (!hero3hit) {
          statusMessageBoss += "None of the heroes could hit the boss! "
        }
      }
    }
    drawBattle()
    drawStatusBlankBoss()
    updateBossHealthBar()
  }
}

function drawStatusBlankBoss() {
  let statusBossElement = document.getElementById("statusBoss");
  let statusBossTemplate = `
  <h4>...Loading...</h4>
  `
  if (statusBossElement && statusBossTemplate != ``) {
    statusBossElement.innerHTML = statusBossTemplate
  }
  setTimeout(drawStatusBoss, 50)
}

function drawStatusBlankHeroes() {
  let statusHerosElement = document.getElementById("statusHeroes");
  let statusHerosTemplate = `
  <h4>...Loading...</h4>
  `
  if (statusHerosElement && statusHerosTemplate != ``) {
    statusHerosElement.innerHTML = statusHerosTemplate
  }
  setTimeout(drawStatusHeroes, 50)
}

function drawStatusBlankDefeat() {
  let statusDefeatElement = document.getElementById("statusDefeat");
  let statusDefeatTemplate = `
  <h4>...loading...</h4>
  `
  if (statusDefeatElement && statusDefeatTemplate != ``) {
    statusDefeatElement.innerHTML = statusDefeatTemplate
  }
  setTimeout(drawStatusDefeat, 50)
}

function drawStatusBoss() {
  let statusBossElement = document.getElementById("statusBoss");
  let statusBossTemplate = `
  <h4>${statusMessageBoss}</h4>
  `
  if (statusBossElement && statusBossTemplate != ``) {
    statusBossElement.innerHTML = statusBossTemplate
  }
  statusMessageBoss = ""
}

function drawStatusHeroes() {
  let statusHerosElement = document.getElementById("statusHeroes");
  let statusHerosTemplate = `
  <h4>${statusMessageHeroes}</h4>
  `
  if (statusHerosElement && statusHerosTemplate != ``) {
    statusHerosElement.innerHTML = statusHerosTemplate
  }
  statusMessageHeroes = ""
}

function drawStatusDefeat() {
  let statusDefeatElement = document.getElementById("statusDefeat");
  let statusDefeatTemplate = `
  <h4>${statusMessageDefeat}</h4>
  `
  if (statusDefeatElement && statusDefeatTemplate != ``) {
    statusDefeatElement.innerHTML = statusDefeatTemplate
  }
  statusMessageDefeat = ""
}

function bossDefeat() {
  statusMessageDefeat += "The boss was defeated... but it's not done yet! "
  // reset boss and upgrade
  boss.maxHealth *= 1.5
  boss.health = boss.maxHealth
  boss.level += 1
  boss.damage *= 1.25
  boss.hitPercent *= 1.5
  // boss make sure JS not dumb
  boss.maxHealth = Math.round(boss.maxHealth)
  boss.health = Math.round(boss.health)
  boss.damage = Math.round(boss.damage)
  boss.hitPercent = Math.round(boss.hitPercent)
  // heal and upgrade heroes
  for (let i = 0; i < heroes.length; i++) {
    heroes[i].maxHealth = Math.round(heroes[i].maxHealth * (1+Math.random()))
    heroes[i].health = heroes[i].maxHealth
    heroes[i].damage = Math.round(heroes[i].damage * (1+Math.random()))
    heroes[i].hitPercent = Math.round(heroes[i].hitPercent * (1+Math.random()))
  }
  // reward heroes
  reward += Math.round(10 * (1 + (boss.level/10)))
  drawReward()
  drawStatusBlankDefeat()
  drawBattle()
  updateBossHealthBar()
}

function drawReward() {
  let rewardElement = document.getElementById("reward")
  let rewardTemplate = `
  <h4>Gold: ${reward}</h4>
  <button onclick="healthPotion()" class="btn btn-info">Health Potion</button>
  <button onclick="gameStart()" class="btn btn-info">Game Start</button>
  `
  if (rewardElement && rewardTemplate != ``) {
    rewardElement.innerHTML = rewardTemplate
  }
}

function attackPlayers() {
  let condition = true
  if (heroes[0].health <= 0  && heroes[1].health <= 0 && heroes[2].health <= 0) {
    condition = false
  }
  if (startGame && condition) {
    let bossHit1 = false;
    let bossHit2 = false;
    let bossHit3 = false;
    let justDied1 = false;
    let justDied2 = false;
    let justDied3 = false;
    let bossHit = 0
    for (let index = 0; index < heroes.length; index++) {
      bossHit = (Math.random()+Math.random()+Math.random()+Math.random()+Math.random())/5
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
          justDied1 = true
          bossHit1 = true;
        } else if (index == 1) {
          justDied2 = true
          bossHit2 = true
        } else if (index == 2) {
          justDied3 = true
          bossHit3 = true;
        }
      }
    }
    if (bossHit1) {
      if (bossHit2) {
        if (bossHit3) {
          statusMessageHeroes += "The boss was able to hit all 3 heroes! "
        } else if (!bossHit3) {
          statusMessageHeroes += "The boss was able to hit " + heroes[0].name + " and " + heroes[1].name + "! "
        }
      } else if (!bossHit2) {
        if (bossHit3) {
          statusMessageHeroes += "The boss was able to hit " + heroes[0].name + " and " + heroes[2].name + "! "
        } else if (!bossHit3) {
          statusMessageHeroes += "The boss was able to hit " + heroes[0].name + "! "
        }
      }
    } else if (!bossHit1) {
      if (bossHit2) {
        if (bossHit3) {
          statusMessageHeroes += "The boss was able to hit " + heroes[1].name + " and " + heroes[2].name + "! "
        } else if (!bossHit3) {
          statusMessageHeroes += "The boss was able to hit " + heroes[1].name + "! "
        }
      } else if (!bossHit2) {
        if (bossHit3) {
          statusMessageHeroes += "The boss was able to hit " + heroes[2].name + "! "
        } else if (!bossHit3) {
          statusMessageHeroes += "The boss wasn't able to hit any heroes! "
        }
      }
    } if (justDied1) {
      statusMessageHeroes += "The boss killed " + heroes[0].name + "! "
    } if (justDied2) {
      statusMessageHeroes += "The boss killed " + heroes[1].name + "! "
    } if (justDied3) {
      statusMessageHeroes += "The boss killed " + heroes[2].name + "! "
    }

    drawStatusBlankHeroes()
    drawBattle()
  } else if (heroes[0].health <= 0  && heroes[1].health <= 0 && heroes[2].health <= 0) {
    statusMessageHeroes += "All the Heroes are dead" 
    drawStatusBlankHeroes()
  }
}

function gameStart() {
  if (!startGame) {
    startGame = true;
  }
  statusMessageBoss =   "..........."
  statusMessageHeroes = "Game Start!"
  statusMessageDefeat = "..........."
  drawStatusBlankBoss()
  drawStatusBlankHeroes()
  drawStatusBlankDefeat()
}

function healthPotion () {
  if (startGame) {
    if (reward >= 30) {
      reward -= 30
      for (let i = 0; i < heroes.length; i++) {
        heroes[i].health = heroes[i].maxHealth
      }
      drawReward()
      statusMessageDefeat = "Health Potion used, all Heroes healed!"
    } else {
      statusMessageDefeat = "Not enough gold!"
    }
    drawStatusDefeat()
  }
}

function bossDefeatActivator() {
  if (startGame) {
    if (boss.health <= 0) {
      boss.health = 0;
      bossDefeat()
    }
  }
}

setInterval(attackPlayers, 5000)
setInterval(bossDefeatActivator, 100)
setInterval(drawBattle, 100)
setInterval(updateBossHealthBar, 100)

drawReward()
drawBattle()
updateBossHealthBar()
drawStatusBoss()
drawStatusHeroes()
drawStatusDefeat()