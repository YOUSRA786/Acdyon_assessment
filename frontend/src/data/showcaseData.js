export const PROBLEMS = [
  {
    id: 'two-sum-ii',
    title: 'Two Sum II - Input Array Is Sorted',
    difficulty: 'Medium',
    category: 'Arrays & Two Pointers',
    acceptanceRate: '61.4%',
    avgTime: '06:12',
    xpReward: 120,
    tags: ['Two Pointers', 'Binary Search', 'Array'],
    description: `Given a **1-indexed** array of integers \`numbers\` that is already sorted in **non-decreasing order**, find two numbers such that they add up to a specific \`target\` number.

Let these two numbers be \`numbers[index1]\` and \`numbers[index2]\` where \`1 <= index1 < index2 <= numbers.length\`.

Return the indices of the two numbers, \`index1\` and \`index2\`, added by one as an integer array \`[index1, index2]\` of length 2.

The tests are generated such that there is **exactly one solution**. You **may not** use the same element twice. Your solution must use only constant extra space $O(1)$.`,
    examples: [
      {
        input: 'numbers = [2, 7, 11, 15], target = 9',
        output: '[1, 2]',
        explanation: 'The sum of 2 and 7 is 9. Therefore, index1 = 1, index2 = 2. We return [1, 2].'
      },
      {
        input: 'numbers = [2, 3, 4], target = 6',
        output: '[1, 3]',
        explanation: 'The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].'
      },
      {
        input: 'numbers = [-1, 0], target = -1',
        output: '[1, 2]',
        explanation: 'The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].'
      }
    ],
    constraints: [
      '2 <= numbers.length <= 3 * 10^4',
      '-1000 <= numbers[i] <= 1000',
      'numbers is sorted in non-decreasing order',
      '-1000 <= target <= 1000',
      'The tests are generated such that there is exactly one solution'
    ],
    hint: 'Because the array is already sorted, you can initialize two pointers at the extremes (left = 0, right = n - 1). If current_sum < target, increment left; if current_sum > target, decrement right.',
    boilerplate: {
      python: `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1
        
        while left < right:
            current_sum = numbers[left] + numbers[right]
            if current_sum == target:
                return [left + 1, right + 1]
            elif current_sum < target:
                left += 1
            else:
                right -= 1
                
        return []`,
      javascript: `/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const currentSum = numbers[left] + numbers[right];
        if (currentSum === target) {
            return [left + 1, right + 1];
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
};`,
      typescript: `function twoSum(numbers: number[], target: number): number[] {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const currentSum = numbers[left] + numbers[right];
        if (currentSum === target) {
            return [left + 1, right + 1];
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }
    return [];
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int left = 0;
        int right = numbers.size() - 1;
        
        while (left < right) {
            int current_sum = numbers[left] + numbers[right];
            if (current_sum == target) {
                return {left + 1, right + 1};
            } else if (current_sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return {};
    }
};`,
      rust: `impl Solution {
    pub fn two_sum(numbers: Vec<i32>, target: i32) -> Vec<i32> {
        let mut left = 0;
        let mut right = numbers.len() - 1;
        
        while left < right {
            let current_sum = numbers[left] + numbers[right];
            if current_sum == target {
                return vec![(left + 1) as i32, (right + 1) as i32];
            } else if current_sum < target {
                left += 1;
            } else {
                right -= 1;
            }
        }
        vec![]
    }
}`,
      go: `package main

func twoSum(numbers []int, target int) []int {
    left := 0
    right := len(numbers) - 1
    
    for left < right {
        currentSum := numbers[left] + numbers[right]
        if currentSum == target {
            return []int{left + 1, right + 1}
        } else if currentSum < target {
            left++
        } else {
            right--
        }
    }
    return []int{}
}`
    },
    testCases: [
      { id: 1, input: 'numbers = [2,7,11,15], target = 9', expected: '[1, 2]', status: 'passed', time: '14ms', memory: '14.2MB' },
      { id: 2, input: 'numbers = [2,3,4], target = 6', expected: '[1, 3]', status: 'passed', time: '18ms', memory: '14.2MB' },
      { id: 3, input: 'numbers = [-1,0], target = -1', expected: '[1, 2]', status: 'passed', time: '22ms', memory: '14.4MB' }
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    category: 'Stack & String',
    acceptanceRate: '40.8%',
    avgTime: '04:15',
    xpReward: 80,
    tags: ['Stack', 'String'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true', explanation: 'Matching single pair.' },
      { input: 's = "()[]{}"', output: 'true', explanation: 'All bracket pairs match sequentially.' },
      { input: 's = "(]"', output: 'false', explanation: 'Mismatched closing bracket.' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    hint: 'Use a Last-In-First-Out (LIFO) stack. Push opening brackets, and pop to check match whenever a closing bracket appears.',
    boilerplate: {
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {')': '(', '}': '{', ']': '['}
        
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
                
        return not stack`,
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = [];
    const mapping = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (mapping[char]) {
            const top = stack.length > 0 ? stack.pop() : '#';
            if (mapping[char] !== top) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
};`,
      typescript: `function isValid(s: string): boolean {
    const stack: string[] = [];
    const mapping: Record<string, string> = { ')': '(', '}': '{', ']': '[' };
    
    for (const char of s) {
        if (mapping[char]) {
            const top = stack.length > 0 ? stack.pop() : '#';
            if (mapping[char] !== top) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`,
      cpp: `#include <string>
#include <stack>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        unordered_map<char, char> mapping = {{')', '('}, {'}', '{'}, {']', '['}};
        
        for (char c : s) {
            if (mapping.count(c)) {
                char top = st.empty() ? '#' : st.top();
                if (!st.empty()) st.pop();
                if (top != mapping[c]) return false;
            } else {
                st.push(c);
            }
        }
        return st.empty();
    }
};`,
      rust: `impl Solution {
    pub fn is_valid(s: String) -> bool {
        let mut stack = Vec::new();
        for c in s.chars() {
            match c {
                '(' => stack.push(')'),
                '{' => stack.push('}'),
                '[' => stack.push(']'),
                ')' | '}' | ']' => {
                    if stack.pop() != Some(c) {
                        return false;
                    }
                }
                _ => {}
            }
        }
        stack.is_empty()
    }
}`,
      go: `package main

func isValid(s string) bool {
    stack := []rune{}
    mapping := map[rune]rune{')': '(', '}': '{', ']': '['}
    
    for _, char := range s {
        if match, ok := mapping[char]; ok {
            if len(stack) == 0 || stack[len(stack)-1] != match {
                return false
            }
            stack = stack[:len(stack)-1]
        } else {
            stack = append(stack, char)
        }
    }
    return len(stack) == 0
}`
    },
    testCases: [
      { id: 1, input: 's = "()"', expected: 'true', status: 'passed', time: '11ms', memory: '13.8MB' },
      { id: 2, input: 's = "()[]{}"', expected: 'true', status: 'passed', time: '12ms', memory: '13.9MB' },
      { id: 3, input: 's = "(]"', expected: 'false', status: 'passed', time: '15ms', memory: '14.0MB' }
    ]
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache Design',
    difficulty: 'Hard',
    category: 'System & Data Structures',
    acceptanceRate: '41.6%',
    avgTime: '14:20',
    xpReward: 200,
    tags: ['Hash Table', 'Linked List', 'Design', 'Doubly-Linked List'],
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
* \`LRUCache(int capacity)\` Initialize the LRU cache with **positive** size \`capacity\`.
* \`int get(int key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
* \`void put(int key, int value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, **evict** the least recently used key.

The functions \`get\` and \`put\` must each run in **$O(1)$** average time complexity.`,
    examples: [
      {
        input: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
        output: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
        explanation: 'Key 2 is evicted on put(3,3). Key 1 is evicted on put(4,4).'
      }
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put'
    ],
    hint: 'Combine a Doubly Linked List for $O(1)$ node insertion/removal with a Hash Map for $O(1)$ key lookup.',
    boilerplate: {
      python: `class Node:
    def __init__(self, key: int, val: int):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {} # key -> Node
        self.head, self.tail = Node(0, 0), Node(0, 0)
        self.head.next, self.tail.prev = self.tail, self.head

    def _remove(self, node: Node):
        prev, nxt = node.prev, node.next
        prev.next, nxt.prev = nxt, prev

    def _insert(self, node: Node):
        nxt = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = nxt
        nxt.prev = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._insert(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._insert(node)
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]`,
      javascript: `class Node {
    constructor(key, val) {
        this.key = key;
        this.val = val;
        this.prev = null;
        this.next = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
        this.head = new Node(0, 0);
        this.tail = new Node(0, 0);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    remove(node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    insert(node) {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next.prev = node;
        this.head.next = node;
    }

    get(key) {
        if (!this.map.has(key)) return -1;
        const node = this.map.get(key);
        this.remove(node);
        this.insert(node);
        return node.val;
    }

    put(key, value) {
        if (this.map.has(key)) {
            this.remove(this.map.get(key));
        }
        const node = new Node(key, value);
        this.map.set(key, node);
        this.insert(node);
        if (this.map.size > this.capacity) {
            const lru = this.tail.prev;
            this.remove(lru);
            this.map.delete(lru.key);
        }
    }
}`,
      typescript: `class LRUCache {
    private capacity: number;
    private map: Map<number, number>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.map = new Map();
    }

    get(key: number): number {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key)!;
        this.map.delete(key);
        this.map.set(key, val);
        return val;
    }

    put(key: number, value: number): void {
        if (this.map.has(key)) {
            this.map.delete(key);
        } else if (this.map.size >= this.capacity) {
            const firstKey = this.map.keys().next().value!;
            this.map.delete(firstKey);
        }
        this.map.set(key, value);
    }
}`,
      cpp: `#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
    int cap;
    list<pair<int, int>> lru;
    unordered_map<int, list<pair<int, int>>::iterator> cache;
public:
    LRUCache(int capacity) : cap(capacity) {}
    
    int get(int key) {
        if (!cache.count(key)) return -1;
        lru.splice(lru.begin(), lru, cache[key]);
        return cache[key]->second;
    }
    
    void put(int key, int value) {
        if (cache.count(key)) {
            cache[key]->second = value;
            lru.splice(lru.begin(), lru, cache[key]);
            return;
        }
        if (lru.size() == cap) {
            cache.erase(lru.back().first);
            lru.pop_back();
        }
        lru.emplace_front(key, value);
        cache[key] = lru.begin();
    }
};`,
      rust: `use std::collections::HashMap;

struct LRUCache {
    capacity: usize,
    map: HashMap<i32, i32>,
    order: Vec<i32>,
}

impl LRUCache {
    fn new(capacity: i32) -> Self {
        Self {
            capacity: capacity as usize,
            map: HashMap::new(),
            order: Vec::new(),
        }
    }
    
    fn get(&mut self, key: i32) -> i32 {
        if let Some(&val) = self.map.get(&key) {
            self.order.retain(|&k| k != key);
            self.order.push(key);
            val
        } else {
            -1
        }
    }
    
    fn put(&mut self, key: i32, value: i32) {
        if self.map.contains_key(&key) {
            self.order.retain(|&k| k != key);
        } else if self.map.len() >= self.capacity {
            if let Some(lru) = self.order.first().copied() {
                self.order.remove(0);
                self.map.remove(&lru);
            }
        }
        self.map.insert(key, value);
        self.order.push(key);
    }
}`,
      go: `package main

import "container/list"

type LRUCache struct {
    capacity int
    items    map[int]*list.Element
    evictList *list.List
}

type entry struct {
    key   int
    value int
}

func Constructor(capacity int) LRUCache {
    return LRUCache{
        capacity:  capacity,
        items:     make(map[int]*list.Element),
        evictList: list.New(),
    }
}

func (this *LRUCache) Get(key int) int {
    if elem, ok := this.items[key]; ok {
        this.evictList.MoveToFront(elem)
        return elem.Value.(*entry).value
    }
    return -1
}

func (this *LRUCache) Put(key int, value int) {
    if elem, ok := this.items[key]; ok {
        this.evictList.MoveToFront(elem)
        elem.Value.(*entry).value = value
        return
    }
    if this.evictList.Len() >= this.capacity {
        tail := this.evictList.Back()
        if tail != nil {
            this.evictList.Remove(tail)
            delete(this.items, tail.Value.(*entry).key)
        }
    }
    elem := this.evictList.PushFront(&entry{key, value})
    this.items[key] = elem
}`
    },
    testCases: [
      { id: 1, input: 'capacity=2, put(1,1), put(2,2), get(1)', expected: '1', status: 'passed', time: '28ms', memory: '19.1MB' },
      { id: 2, input: 'put(3,3), get(2)', expected: '-1 (evicted)', status: 'passed', time: '31ms', memory: '19.2MB' },
      { id: 3, input: 'put(4,4), get(1), get(3), get(4)', expected: '[-1, 3, 4]', status: 'passed', time: '35ms', memory: '19.4MB' }
    ]
  },
  {
    id: 'merge-k-sorted-lists',
    title: 'Merge k Sorted Lists',
    difficulty: 'Hard',
    category: 'Divide & Conquer / Heap',
    acceptanceRate: '51.2%',
    avgTime: '12:45',
    xpReward: 180,
    tags: ['Linked List', 'Divide and Conquer', 'Heap (Priority Queue)'],
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

*Merge all the linked-lists into one sorted linked-list and return it.*`,
    examples: [
      {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
        explanation: 'Merging 3 sorted lists into one unified sorted sequence.'
      }
    ],
    constraints: [
      'k == lists.length',
      '0 <= k <= 10^4',
      '0 <= lists[i].length <= 500',
      '-10^4 <= lists[i][j] <= 10^4',
      'lists[i] is sorted in ascending order.'
    ],
    hint: 'Use a min-heap / priority queue to keep track of the smallest current head node across all k lists in O(N log k) time.',
    boilerplate: {
      python: `import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: list[ListNode]) -> ListNode:
        heap = []
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(heap, (node.val, i, node))
                
        dummy = ListNode(0)
        curr = dummy
        while heap:
            val, i, node = heapq.heappop(heap)
            curr.next = node
            curr = curr.next
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
                
        return dummy.next`,
      javascript: `var mergeKLists = function(lists) {
    if (!lists.length) return null;
    const mergeTwo = (l1, l2) => {
        const dummy = new ListNode(0);
        let cur = dummy;
        while (l1 && l2) {
            if (l1.val < l2.val) { cur.next = l1; l1 = l1.next; }
            else { cur.next = l2; l2 = l2.next; }
            cur = cur.next;
        }
        cur.next = l1 || l2;
        return dummy.next;
    };
    while (lists.length > 1) {
        const nextLists = [];
        for (let i = 0; i < lists.length; i += 2) {
            nextLists.push(i + 1 < lists.length ? mergeTwo(lists[i], lists[i+1]) : lists[i]);
        }
        lists = nextLists;
    }
    return lists[0];
};`,
      typescript: `function mergeKLists(lists: any[]): any {
    if (lists.length === 0) return null;
    return lists[0];
}`,
      cpp: `#include <vector>
#include <queue>
using namespace std;

class Solution {
public:
    // C++ Min Heap Priority Queue Solution
};`,
      rust: `// Rust Heap solution`,
      go: `// Go Heap solution`
    },
    testCases: [
      { id: 1, input: 'lists = [[1,4,5],[1,3,4],[2,6]]', expected: '[1,1,2,3,4,4,5,6]', status: 'passed', time: '34ms', memory: '16.5MB' },
      { id: 2, input: 'lists = []', expected: '[]', status: 'passed', time: '8ms', memory: '12.1MB' }
    ]
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    category: 'Dynamic Programming / Two Pointers',
    acceptanceRate: '60.3%',
    avgTime: '11:10',
    xpReward: 190,
    tags: ['Two Pointers', 'Dynamic Programming', 'Monotonic Stack'],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      {
        input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
        output: '6',
        explanation: 'The elevation map traps 6 total units of rain water.'
      }
    ],
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    hint: 'Track maxLeft and maxRight with two pointers moving toward the peak bar.',
    boilerplate: {
      python: `class Solution:
    def trap(self, height: list[int]) -> int:
        if not height:
            return 0
        l, r = 0, len(height) - 1
        left_max, right_max = height[l], height[r]
        water = 0
        while l < r:
            if left_max < right_max:
                l += 1
                left_max = max(left_max, height[l])
                water += left_max - height[l]
            else:
                r -= 1
                right_max = max(right_max, height[r])
                water += right_max - height[r]
        return water`,
      javascript: `var trap = function(height) {
    let l = 0, r = height.length - 1;
    let leftMax = height[l], rightMax = height[r];
    let water = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = Math.max(leftMax, height[l]);
            water += leftMax - height[l];
        } else {
            r--;
            rightMax = Math.max(rightMax, height[r]);
            water += rightMax - height[r];
        }
    }
    return water;
};`,
      typescript: `function trap(height: number[]): number {
    let l = 0, r = height.length - 1;
    let leftMax = height[l], rightMax = height[r];
    let water = 0;
    while (l < r) {
        if (leftMax < rightMax) {
            l++;
            leftMax = Math.max(leftMax, height[l]);
            water += leftMax - height[l];
        } else {
            r--;
            rightMax = Math.max(rightMax, height[r]);
            water += rightMax - height[r];
        }
    }
    return water;
}`,
      cpp: `// C++ Two Pointers Solution`,
      rust: `// Rust Two Pointers Solution`,
      go: `// Go Two Pointers Solution`
    },
    testCases: [
      { id: 1, input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', expected: '6', status: 'passed', time: '19ms', memory: '15.1MB' }
    ]
  },
  {
    id: 'coin-change',
    title: 'Coin Change Minimum Coins',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    acceptanceRate: '43.9%',
    avgTime: '08:30',
    xpReward: 130,
    tags: ['Dynamic Programming', 'Breadth-First Search', 'Array'],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      { input: 'coins = [1, 2, 5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
      { input: 'coins = [2], amount = 3', output: '-1', explanation: 'Cannot make 3 using only 2s.' }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    hint: 'Build a dp array where dp[i] is the minimum coins needed for amount i.',
    boilerplate: {
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0
        
        for coin in coins:
            for x in range(coin, amount + 1):
                dp[x] = min(dp[x], dp[x - coin] + 1)
                
        return dp[amount] if dp[amount] != float('inf') else -1`,
      javascript: `var coinChange = function(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let coin of coins) {
        for (let x = coin; x <= amount; x++) {
            dp[x] = Math.min(dp[x], dp[x - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
};`,
      typescript: `function coinChange(coins: number[], amount: number): number {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (const coin of coins) {
        for (let x = coin; x <= amount; x++) {
            dp[x] = Math.min(dp[x], dp[x - coin] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      cpp: `// C++ DP Solution`,
      rust: `// Rust DP Solution`,
      go: `// Go DP Solution`
    },
    testCases: [
      { id: 1, input: 'coins = [1,2,5], amount = 11', expected: '3', status: 'passed', time: '18ms', memory: '14.6MB' },
      { id: 2, input: 'coins = [2], amount = 3', expected: '-1', status: 'passed', time: '12ms', memory: '13.9MB' }
    ]
  }
];

export const LIVE_ARENA_COMPETITORS = [
  {
    id: 'user-self',
    name: 'You (Alex)',
    handle: '@alex_dev',
    avatar: '👨‍💻',
    elo: 1840,
    progress: 78,
    status: 'Typing solution...',
    statusType: 'active',
    passedCount: 2,
    totalTests: 3,
    score: 840,
    rank: 3,
    lang: 'Python'
  },
  {
    id: 'comp-1',
    name: 'Sarah Chen',
    handle: '@sarah_algo',
    avatar: '👩‍💻',
    elo: 1920,
    progress: 92,
    status: 'Compiling test case 3...',
    statusType: 'running',
    passedCount: 3,
    totalTests: 3,
    score: 890,
    rank: 1,
    lang: 'Rust'
  },
  {
    id: 'comp-2',
    name: 'Maya Lin',
    handle: '@maya_dev',
    avatar: '⚡',
    elo: 1795,
    progress: 64,
    status: 'Refactoring O(1) space...',
    statusType: 'active',
    passedCount: 2,
    totalTests: 3,
    score: 760,
    rank: 2,
    lang: 'TypeScript'
  },
  {
    id: 'comp-3',
    name: 'David Kim',
    handle: '@david_k',
    avatar: '🦾',
    elo: 1720,
    progress: 45,
    status: 'Resolving index bounds...',
    statusType: 'warning',
    passedCount: 1,
    totalTests: 3,
    score: 680,
    rank: 4,
    lang: 'C++'
  }
];

export const LEADERBOARD_USERS = [
  {
    rank: 1,
    name: 'Sarah Chen',
    handle: '@sarah_algo',
    avatar: '👩‍💻',
    division: 'Grandmaster',
    elo: 2480,
    winRate: '84.2%',
    matchesPlayed: 342,
    streak: 12,
    country: 'CA',
    bio: 'Systems engineer & competitive algorithmist. Sub-30ms execution enthusiast.',
    favLangs: ['Rust', 'C++', 'Python'],
    radarStats: { speed: 96, accuracy: 94, consistency: 91, concurrency: 89, complexity: 98 },
    recentMatches: [
      { id: 'm-101', opponent: 'Elena Rostova', result: 'Victory (+24 ELO)', time: '04:12', problem: 'LRU Cache Design' },
      { id: 'm-102', opponent: 'Marcus Thorne', result: 'Victory (+18 ELO)', time: '03:45', problem: 'Trapping Rain Water' },
      { id: 'm-103', opponent: 'Jin Woo', result: 'Victory (+28 ELO)', time: '05:30', problem: 'Merge k Sorted Lists' }
    ]
  },
  {
    rank: 2,
    name: 'Jin Woo',
    handle: '@shadow_coder',
    avatar: '🥷',
    division: 'Grandmaster',
    elo: 2415,
    winRate: '81.6%',
    matchesPlayed: 289,
    streak: 8,
    country: 'KR',
    bio: 'Graph traversal specialist. O(V + E) or bust.',
    favLangs: ['C++', 'Go', 'Python'],
    radarStats: { speed: 92, accuracy: 96, consistency: 88, concurrency: 94, complexity: 95 },
    recentMatches: [
      { id: 'm-201', opponent: 'Sarah Chen', result: 'Defeat (-12 ELO)', time: '05:30', problem: 'Merge k Sorted Lists' },
      { id: 'm-202', opponent: 'Elena Rostova', result: 'Victory (+22 ELO)', time: '04:02', problem: 'Course Schedule II' }
    ]
  },
  {
    rank: 3,
    name: 'Elena Rostova',
    handle: '@elena_r',
    avatar: '🚀',
    division: 'Grandmaster',
    elo: 2360,
    winRate: '79.0%',
    matchesPlayed: 245,
    streak: 5,
    country: 'DE',
    bio: 'Distributed systems & high-throughput concurrency duels.',
    favLangs: ['Rust', 'TypeScript', 'Go'],
    radarStats: { speed: 89, accuracy: 91, consistency: 94, concurrency: 97, complexity: 90 },
    recentMatches: [
      { id: 'm-301', opponent: 'Alex Sterling', result: 'Victory (+16 ELO)', time: '04:48', problem: 'Coin Change' }
    ]
  },
  {
    rank: 4,
    name: 'Alex Sterling (You)',
    handle: '@alex_dev',
    avatar: '👨‍💻',
    division: 'Diamond',
    elo: 2190,
    winRate: '76.4%',
    matchesPlayed: 178,
    streak: 6,
    country: 'US',
    bio: 'Full stack product engineer & algorithm competitor.',
    favLangs: ['TypeScript', 'Python', 'Rust'],
    radarStats: { speed: 88, accuracy: 92, consistency: 86, concurrency: 84, complexity: 89 },
    recentMatches: [
      { id: 'm-401', opponent: 'Maya Lin', result: 'Victory (+24 ELO)', time: '03:12', problem: 'Two Sum II' }
    ]
  },
  {
    rank: 5,
    name: 'Maya Lin',
    handle: '@maya_dev',
    avatar: '⚡',
    division: 'Diamond',
    elo: 2140,
    winRate: '74.8%',
    matchesPlayed: 194,
    streak: 3,
    country: 'SG',
    bio: 'Dynamic programming & tree recursion enthusiast.',
    favLangs: ['Python', 'TypeScript', 'C++'],
    radarStats: { speed: 85, accuracy: 89, consistency: 88, concurrency: 82, complexity: 91 },
    recentMatches: [
      { id: 'm-501', opponent: 'David Kim', result: 'Victory (+19 ELO)', time: '04:15', problem: 'Valid Parentheses' }
    ]
  },
  {
    rank: 6,
    name: 'Marcus Thorne',
    handle: '@marcus_t',
    avatar: '🐺',
    division: 'Diamond',
    elo: 2095,
    winRate: '72.1%',
    matchesPlayed: 162,
    streak: 4,
    country: 'UK',
    bio: 'Bit manipulation & low level memory layout hacker.',
    favLangs: ['C++', 'Rust', 'Go'],
    radarStats: { speed: 90, accuracy: 82, consistency: 85, concurrency: 88, complexity: 87 },
    recentMatches: []
  },
  {
    rank: 7,
    name: 'Priya Patel',
    handle: '@priya_codes',
    avatar: '👑',
    division: 'Gold',
    elo: 1890,
    winRate: '68.5%',
    matchesPlayed: 130,
    streak: 2,
    country: 'IN',
    bio: 'Speed duelist & algorithmic puzzle solver.',
    favLangs: ['Java', 'Python', 'TypeScript'],
    radarStats: { speed: 82, accuracy: 84, consistency: 80, concurrency: 75, complexity: 83 },
    recentMatches: []
  },
  {
    rank: 8,
    name: 'David Kim',
    handle: '@david_k',
    avatar: '🦾',
    division: 'Gold',
    elo: 1820,
    winRate: '65.2%',
    matchesPlayed: 115,
    streak: 1,
    country: 'AU',
    bio: 'Climbing the ranks one two-pointer duel at a time.',
    favLangs: ['C++', 'Python'],
    radarStats: { speed: 80, accuracy: 81, consistency: 78, concurrency: 76, complexity: 80 },
    recentMatches: []
  }
];

export const RECRUITER_CANDIDATE_DATA = {
  candidate: {
    name: 'Alex Sterling',
    role: 'Senior Full-Stack & Systems Engineer',
    targetPosition: 'Staff Frontend & Platform Engineer',
    experience: '6+ Years Experience',
    avatar: '👨‍💻',
    overallScore: 92.5,
    ratingGrade: 'S-Tier',
    metrics: [
      { label: 'Problem Solving', score: 94, barWidth: '94%', note: 'Optimal O(1) space deduction under 90s' },
      { label: 'Coding Speed', score: 88, barWidth: '88%', note: '03:42 total solve time (Top 6%)' },
      { label: 'Code Quality & Elegance', score: 96, barWidth: '96%', note: 'Clean pointer naming, early exit safeguards' },
      { label: 'Debugging & Edge Cases', score: 92, barWidth: '92%', note: 'Self-corrected 1-based index shift in 18s' },
      { label: 'Concurrency Resilience', score: 86, barWidth: '86%', note: 'Zero race conditions across simulated worker runs' }
    ],
    summary: 'Candidate demonstrated exceptional algorithmic intuition. Quickly discarded the brute-force $O(N^2)$ hash lookup in favor of $O(N)$ two-pointer traversal with zero heap allocation.',
    completedProblems: [
      { title: 'Two Sum II - Input Array Is Sorted', time: '03:42', memory: '14.2MB', complexity: 'O(N) Time, O(1) Space', verdict: 'ACCEPTED' },
      { title: 'Valid Parentheses', time: '02:18', memory: '13.8MB', complexity: 'O(N) Time, O(N) Space', verdict: 'ACCEPTED' },
      { title: 'LRU Cache Design', time: '08:50', memory: '19.1MB', complexity: 'O(1) Get/Put amortized', verdict: 'ACCEPTED' }
    ]
  },
  replayFrames: [
    {
      timestamp: '00:00',
      label: 'Read & Mental Model',
      phase: 'Analysis',
      keystrokes: 0,
      activeLine: 1,
      codeSnippet: `# Step 1: Read problem statement
# Input array is sorted -> Two Pointer strategy is optimal
# Constraints: 1-indexed return, O(1) extra space guarantee`,
      terminalOutput: 'Analyzing constraints...\nInput array non-decreasing sorted.\nSelected strategy: Two-Pointer Convergence.'
    },
    {
      timestamp: '00:45',
      label: 'Initialize Boundaries',
      phase: 'Drafting',
      keystrokes: 110,
      activeLine: 5,
      codeSnippet: `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left = 0
        right = len(numbers) - 1`,
      terminalOutput: 'Buffer modified: left=0, right=len(numbers)-1 initialized.'
    },
    {
      timestamp: '01:30',
      label: 'Pointer Partition Loop',
      phase: 'Implementation',
      keystrokes: 245,
      activeLine: 10,
      codeSnippet: `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1
        
        while left < right:
            current_sum = numbers[left] + numbers[right]
            if current_sum == target:
                return [left, right] # Note: needs 1-index adjustment
            elif current_sum < target:
                left += 1
            else:
                right -= 1`,
      terminalOutput: 'Drafting main loop.\nEvaluating branching conditions.'
    },
    {
      timestamp: '02:15',
      label: 'Test Execution & Bug Catch',
      phase: 'Verification',
      keystrokes: 310,
      activeLine: 9,
      codeSnippet: `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1
        
        while left < right:
            current_sum = numbers[left] + numbers[right]
            if current_sum == target:
                # Caught offset bug: Problem requires 1-indexed output!
                return [left + 1, right + 1]
            elif current_sum < target:
                left += 1
            else:
                right -= 1`,
      terminalOutput: 'Running Test Harness...\n[Test 1] Input [2,7,11,15], target 9\nReturned [0, 1] -> Expected [1, 2]\nSelf-corrected to 1-indexed output in 12s.'
    },
    {
      timestamp: '03:42',
      label: 'Final Submission Verified',
      phase: 'Completed',
      keystrokes: 420,
      activeLine: 16,
      codeSnippet: `class Solution:
    def twoSum(self, numbers: list[int], target: int) -> list[int]:
        left, right = 0, len(numbers) - 1
        
        while left < right:
            current_sum = numbers[left] + numbers[right]
            if current_sum == target:
                return [left + 1, right + 1]
            elif current_sum < target:
                left += 1
            else:
                right -= 1
                
        return []`,
      terminalOutput: 'All 3 Test Suites Passed.\nRuntime: 38ms (Beats 98.4%)\nMemory: 14.2MB (Beats 96.1%)\nVerdict: ACCEPTED'
    }
  ]
};

export const EASTER_EGG_DATA = {
  codename: 'WHITE_RABBIT_RECRUITER_PROTOCOL',
  version: 'v2.4.99-CLASSIFIED',
  asciiRabbit: `
  (\\(\\
  ( -.-)  ~ "Follow the white rabbit through the matrix."
  o_(")(")
  `,
  token: 'CA-BUNNY-9021-S_TIER',
  systemLogs: [
    '[00:00:01] INITIATING RECRUITER BUNNY BACKDOOR...',
    '[00:00:02] BYPASSING CONVENTIONAL RESUME SCREENS (STATUS: 200 OK)',
    '[00:00:03] LOCATING S-TIER FULL-STACK TALENT...',
    '[00:00:04] MATCH FOUND: Senior Product & Frontend Architect',
    '[00:00:05] FAST-TRACK RECRUITER TOKEN GENERATED: #CA-BUNNY-2026',
    '[00:00:06] DEPLOYING ZERO-LATENCY INTERVIEW ACCESS PROTOCOL...'
  ]
};
