package pl.ans.weatherapp.utils;

import java.util.Random;

public class RandomNumberGenerator {
    private static final Random random = new Random();

    public static double getDoubleInRange(double min, double max) {
        return min + (max - min) * random.nextDouble();
    }

    public static double modify(double number) {
        return number + (number * getDoubleInRange(0.001, 0.03) * (random.nextBoolean() ? -1 : 1));
    }
}
