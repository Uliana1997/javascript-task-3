'use strict';

/**
 * Сделано задание на звездочку
 * Реализовано оба метода и tryLater
 */
exports.isStar = true;

/**
 * @param {Object} schedule – Расписание Банды
 * @param {Number} duration - Время на ограбление в минутах
 * @param {Object} workingHours – Время работы банка
 * @param {String} workingHours.from – Время открытия, например, "10:00+5"
 * @param {String} workingHours.to – Время закрытия, например, "18:00+5"
 * @returns {Object}
 */

function lol(schedule, bankHours, arr, man) {
    var res = [];
    var bank = bankHours.from.split('+')[1];
    var days = ["ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС", "ПН"];
    if (man != bank) {
        arr.forEach(function(item, i, arr) {
            var k = Number(item.from.split(' ')[1].split(':')[0]) + (Number(bank) - Number(man));
            var l = Number(item.to.split(' ')[1].split(':')[0]) + (Number(bank) - Number(man));
            var dayk = item.from.split(' ')[0];
            var dayl = item.to.split(' ')[0];
            if (k < 0) {
                for(var j = 0; j < days.length; j++) {
                    if (item.from.split(' ')[0] === days[j]) {
                        dayk = days[j-1];
                    }
                } 
                k = 24 + k;
            }
            if (l < 0) {
                for(var j = 0; j < days.length; j++) {
                    if (item.to.split(' ')[0] === days[j]) {
                        dayl = days[j-1];
                    }
                }
                l = 24 + l;
            }
            var m = String(k);
            var n = String(l);
            if (m.length < 2) {
                res.push(dayk + ' ' + '0' + m + ':' + item.from.split(' ')[1].split(':')[1].split('+')[0] + 'to' + dayl + ' ' + n + ':' + item.to.split(' ')[1].split(':')[1].split('+')[0]);
            }
            else if (n.length < 2) {
                res.push(dayk + ' ' + m + ':' + item.from.split(' ')[1].split(':')[1].split('+')[0] + 'to' + dayl + ' ' + '0' + n + ':' + item.to.split(' ')[1].split(':')[1].split('+')[0]);
            } else {
            res.push(dayk + ' ' + m + ':' + item.from.split(' ')[1].split(':')[1].split('+')[0] + 'to' + dayl + ' ' + n + ':' + item.to.split(' ')[1].split(':')[1].split('+')[0]);                
            }
        });
    }

    return res;
};

function parse_(schedule, bankHours) {
    var hourL = schedule.Linus[0].from.split('+')[1];
    var hourD = schedule.Danny[0].from.split('+')[1];
    var hourR = schedule.Rusty[0].from.split('+')[1];
    var arrL = schedule.Linus;
    var arrD = schedule.Danny;
    var arrR = schedule.Rusty;
    var result = [];
    result.push(lol(schedule, bankHours, arrD, hourD));
    result.push(lol(schedule, bankHours, arrR, hourR));
    result.push(lol(schedule, bankHours, arrL, hourL));

    return result;
}

function Nowdays(schedule, workingHours) {
    var time = parse_(schedule, workingHours);
    var man = {};
    man.Danny = [];
    man.Rusty = [];
    man.Linus = [];
    var arr1 = time[0];
    var arr2 = time[1];
    var arr3 = time[2];
    arr1.forEach(function(item, i, arr1) {
        man.Danny.push({from : (new Date(2016, 9, 17 + i , item.split('to')[0].split(' ')[1].split(':')[0], item.split('to')[0].split(' ')[1].split(':')[1])), 
                        to : (new Date(2016, 9, 17 + i, item.split('to')[1].split(' ')[1].split(':')[0], item.split('to')[1].split(' ')[1].split(':')[1]))});

    });
    arr2.forEach(function(elem, j, arr2) {
        man.Rusty.push({from : (new Date(2016, 9, 17 + j , elem.split('to')[0].split(' ')[1].split(':')[0], elem.split('to')[0].split(' ')[1].split(':')[1])), 
                        to : (new Date(2016, 9, 17 + j, elem.split('to')[1].split(' ')[1].split(':')[0], elem.split('to')[1].split(' ')[1].split(':')[1]))});

    });
    arr3.forEach(function(el, m, arr3) {
        man.Linus.push({from : (new Date(2016, 9, 17 + m , el.split('to')[0].split(' ')[1].split(':')[0], el.split('to')[0].split(' ')[1].split(':')[1])), 
                        to : (new Date(2016, 9, 17 + m, el.split('to')[1].split(' ')[1].split(':')[0], el.split('to')[1].split(' ')[1].split(':')[1]))});

    });
    return man;
}


function invert(schedule, workingHours, start, end) {
    var spareIntervals = [];
    var current = start;
    var man = Nowdays(schedule, workingHours);
    for(var i = 0; i < man.length; i++) {
        man[i].forEach(function (elem, j) {
            if (current < elem.from) {
                spareIntervals.push({
                from: current,
                to: elem.from});

            current = Math.max(elem.to, current);
            }

        if (current < end) {
            spareIntervals.push({
                from: current,
                to: end
            });
        }
        });
    };

    return spareIntervals;
}

exports.getAppropriateMoment = function (schedule, duration, workingHours) {
    console.info(schedule, duration, workingHours);
    var start = new Date(2016, 9, 17, 0, 0);
    var end = new Date(2016, 9, 19, 23, 59);



    return {

        /**
         * Найдено ли время
         * @returns {Boolean}
         */
        exists: function () {
            return false;
        },

        /**
         * Возвращает отформатированную строку с часами для ограбления
         * Например,
         *   "Начинаем в %HH:%MM (%DD)" -> "Начинаем в 14:59 (СР)"
         * @param {String} template
         * @returns {String}
         */
        format: function (template) {
            return template;
        },

        /**
         * Попробовать найти часы для ограбления позже [*]
         * @star
         * @returns {Boolean}
         */
        tryLater: function () {
            return false;
        }
    };
};
