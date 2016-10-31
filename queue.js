/**
 * Mnemonist Queue
 * ================
 *
 * Queue implementation based on the ideas of Queue.js that seems to beat
 * a LinkedList one in performance.
 */

/**
 * Queue
 *
 * @constructor
 */
function Queue() {
  this.clear();
}

/**
 * Method used to clear the queue.
 *
 * @return {undefined}
 */
Queue.prototype.clear = function() {

  // Properties
  this.items = [];
  this.offset = 0;
  this.size = 0;
};

/**
 * Method used to add an item to the queue.
 *
 * @param  {any}    item - Item to enqueue.
 * @return {number}
 */
Queue.prototype.enqueue = function(item) {

  this.items.push(item);
  return ++this.size;
};

/**
 * Method used to retrieve & remove the first item of the queue.
 *
 * @return {any}
 */
Queue.prototype.dequeue = function() {
  if (!this.size)
    return;

  var item = this.items[this.offset];

  if (++this.offset * 2 >= this.items.length) {
    this.items = this.items.slice(this.offset);
    this.offset = 0;
  }

  this.size--;

  return item;
};

/**
 * Method used to retrieve the first item of the queue.
 *
 * @return {any}
 */
Queue.prototype.peek = function() {
  if (!this.size)
    return;

  return this.items[this.offset];
};

/**
 * Method used to iterate over the queue.
 *
 * @param  {function}  callback - Function to call for each item.
 * @param  {object}    scope    - Optional scope.
 * @return {undefined}
 */
Queue.prototype.forEach = function(callback, scope) {
  scope = arguments.length > 1 ? scope : this;

  for (var i = this.offset, j = 0, l = this.items.length; i < l; i++, j++)
    callback.call(scope, this.items[i], j, this);
};

/*
 * Method used to convert the queue to a JavaScript array.
 *
 * @return {array}
 */
Queue.prototype.toArray = function() {
  return this.items.slice(this.offset);
};

/**
 * Convenience known methods.
 */
Queue.prototype.toString = function() {
  return this.toArray().join(',');
};

Queue.prototype.toJSON = function() {
  return this.toArray();
};

Queue.prototype.inspect = function() {
  var array = this.toArray();

  // Trick so that node displays the name of the constructor
  Object.defineProperty(array, 'constructor', {
    value: Queue,
    enumerable: false
  });

  return array;
};

/**
 * Exporting.
 */
module.exports = Queue;
