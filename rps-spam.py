from pynput.keyboard import Key, Controller
import random
import time

keyboard = Controller()
time.sleep(5)

while True:
	keyboard.type('-rps')
	keyboard.press(Key.enter)
	keyboard.release(Key.enter)

	keyboard.press(Key.ctrl)
	keyboard.press('k')
	keyboard.release('k')
	keyboard.release(Key.ctrl)
	time.sleep(0.1)
	keyboard.type("daniel")
	keyboard.press(Key.enter)
	keyboard.release(Key.enter)

	time.sleep(1) # wait for reactions to load
	#keyboard.type(random.choice(["+:rock:", "+:newspaper2:", "+:scissors:"]))
	keyboard.type("+:rock:") # currently only rock works
	keyboard.press(Key.enter)
	keyboard.release(Key.enter)

	keyboard.press(Key.ctrl)
	keyboard.press('k')
	keyboard.release('k')
	keyboard.release(Key.ctrl)
	time.sleep(0.1)
	keyboard.type("vocal")
	keyboard.press(Key.enter)
	keyboard.release(Key.enter)

	time.sleep(0.5)
