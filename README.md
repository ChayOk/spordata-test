# spordata-test
Test task to make a sportbook
Теория для изучения:

https://bet-team.ru/articles/teoriy-stavok-na-sport/

http://stavki.info/1-chapter-teoriya-stavok

 

Требования:

1) Вся задача реализуется на PHP, ReactJS.

2) В  качестве репозитория используется Mercurial. 

3) Каждое задание делается отдельным комитом с указанием номера задачи в Jira. Пример названия комита:  INT-1234: Create structure

 

Задача:

1) Необходимо создать мини-версию спортсбука от момента получения данных до момента отображения данных на фронте

2) В рамках задачи реализовать интерфейс IParser с функцией parse(). Функция должна в ответ возвращать обьект класса Structure с заполненными данными

2.1) Написать класс, который позволит разобрать websocket kralbet.com wss://srv.kralbet.com/sport/?EIO=3&transport=websocket 

42["subscribe-PreliveEvents",{"market_group":"prelive","locale":"en_US"}] 
2.2) Сделать структуру
Structure

sports (Sport)
countries (Country)
tournaments (Tournament <- Sport, Country)
tournament_name
<- sport
<- country 
events (Event <- Tournament)
event_name
event_id
event_start_time 
scopes (Scope <- Event)
scope_type
scope_number
scope_status 
markets (Market <- Scope)
market_type
market_type_parameter 
outcomes (Outcome <- Market)
odds
outcome_id
3) После получения структуры, необходимо создать класс реализующий интерфейс IImport (c функцией import(Structure $structure)), который позволит записать Structure в базу данных (mysql)

3.1) Сделать класс которому можно отдать такую структуру и чтобы он сохранил в базу.

3.2) Реализовать схему базы данных по указанным в Structure полям и зависимостям

3.3) Создать ключи на поля "{}id", "{_}_name", разобраться с индексами

4) Создать на react мини-версию спортсбука, который по API делает запросы к бэкенду и отрисует данные из базы. 
Технологии для изучения:

React
React Router
Redux
5) Реализовать корзину сайта. При клике на коэфицент он должен добавляться в корзину. В корзине нужно вводить сумму ставки, на основании её и коэфицента должен быть высчитан потенциальный выигрыш
