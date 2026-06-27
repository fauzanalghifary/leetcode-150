# @param {Integer[]} nums
# @return {Boolean}
def can_jump(nums)
  max_reach = 0

  nums.each_with_index do |jump, i|
    return false if i > max_reach
    max_reach = [max_reach, i + jump].max
  end

  true
end

require "minitest/autorun"

class CanJumpTest < Minitest::Test
  def test_example_1
    assert_equal true, can_jump([2, 3, 1, 1, 4])
  end

  def test_example_2
    assert_equal false, can_jump([3, 2, 1, 0, 4])
  end

  def test_single_element_is_already_at_last_index
    assert_equal true, can_jump([0])
  end

  def test_zero_at_start_blocks_progress
    assert_equal false, can_jump([0, 1])
  end

  def test_first_jump_reaches_last_index
    assert_equal true, can_jump([2, 0, 0])
  end

  def test_large_first_jump_skips_all_zeros
    assert_equal true, can_jump([5, 0, 0, 0, 0, 0])
  end

  def test_zero_in_middle_can_be_jumped_over
    assert_equal true, can_jump([2, 0, 1])
  end

  def test_stuck_before_last_index
    assert_equal false, can_jump([1, 0, 1, 0])
  end

  def test_all_ones_reaches_end
    assert_equal true, can_jump([1, 1, 1, 1])
  end

  def test_trailing_zero_is_the_destination
    assert_equal true, can_jump([1, 1, 0])
  end

  def test_unreachable_final_index_after_zero
    assert_equal false, can_jump([3, 2, 1, 0, 0, 4])
  end

  def test_smaller_first_jump_needed_to_reach_far_jumper
    assert_equal true, can_jump([2, 5, 0, 0])
  end
end
